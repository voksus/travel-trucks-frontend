import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./operations";

export const initialFilters = {
  location: "",
  camperForm: "",
  engine: "",
  transmission: "",
  equipment: {
    AC: false,
    bathroom: false,
    kitchen: false,
    TV: false,
    radio: false,
    refrigerator: false,
    microwave: false,
    gas: false,
    water: false,
  },
};
const initialState = {
  items: [],
  total: 0,
  page: 1,
  limit: 5,
  loading: false,
  error: null,
  filters: initialFilters,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetCampersState: (state) => {
      state.items = [];
      state.total = 0;
      state.page = 1;
    },

    setFiltersState: (state, action) => {
      state.filters = action.payload;
    },

    resetFiltersState: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        
        const { items, total } = action.payload;
        state.total = total;

        const loadedPage = action.meta.arg?.page || 1;

        if (loadedPage === 1) {
          state.items = items;
        } else {
          state.items = [...state.items, ...items];
        }

        state.page = loadedPage;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCampersState, setFiltersState, resetFiltersState } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
