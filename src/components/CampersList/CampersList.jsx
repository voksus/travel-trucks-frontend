import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/campers/operations";
import {
  selectCampers,
  selectIsLoading,
  selectError,
  selectTotal,
  selectPage,
  selectLimit,
  selectFilters,
} from "../../redux/campers/selectors";
import {
  resetFiltersState,
  resetCampersState,
  initialFilters,
} from "../../redux/campers/slice";
import { selectFavorites, toggleFavorite } from "../../redux/favorites/slice";
import CamperCard from "../CamperCard/CamperCard";
import NoCampersFound from "../NoCampersFound/NoCampersFound";
import StatusModal from "../StatusModal/StatusModal";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import styles from "./CampersList.module.css";

const CampersList = () => {
  const dispatch = useDispatch();

  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const total = useSelector(selectTotal);
  const page = useSelector(selectPage);
  const limit = useSelector(selectLimit);
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);

  useEffect(() => {
    dispatch(fetchCampers({ page: 1, limit, filters }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, limit]);

  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };

  const handleClearFilters = () => {
    dispatch(resetFiltersState());
    dispatch(resetCampersState());
    dispatch(
      fetchCampers({
        page: 1,
        limit,
        filters: initialFilters,
      }),
    );
  };

  const handleViewAllCampers = () => {
    dispatch(resetCampersState());
    dispatch(
      fetchCampers({
        page: 1,
        limit,
        filters: initialFilters,
      }),
    );
  };

  const handleLoadMore = () => {
    dispatch(fetchCampers({ page: page + 1, limit, filters }));
  };

  const hasMore = campers.length < total;

  return (
    <div className={styles.campersList}>
      {isLoading &&
        (campers.length === 0 ? (
          <StatusModal type="campers" />
        ) : (
          <StatusModal type="more" />
        ))}
      {error && <p>Error: {error}</p>}

      {campers.length > 0 ? (
        <>
          <ul className={styles.list}>
            {campers.map((camper) => (
              <li key={camper.id} className={styles.listItem}>
                <CamperCard
                  camper={camper}
                  isFavorite={favorites.includes(camper.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </li>
            ))}
          </ul>
          <div className={styles.loadedAmountInfo}>
            {total > campers.length
              ? `${campers.length} of ${total} campers loaded`
              : total > 1
                ? `All ${total} campers loaded`
                : `Only this one camper loaded`}
          </div>
        </>
      ) : (
        !isLoading && (
          <NoCampersFound
            onClearFilters={handleClearFilters}
            onViewAll={handleViewAllCampers}
          />
        )
      )}

      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore} disabled={isLoading} />
      )}
    </div>
  );
};

export default CampersList;
