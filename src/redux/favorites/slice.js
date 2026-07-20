import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("favorites")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      if (state.items.includes(id)) {
        state.items = state.items.filter((item) => item !== id);
      } else {
        state.items.push(id);
      }
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
    syncFavorites: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { toggleFavorite, syncFavorites } = favoritesSlice.actions;
export const selectFavorites = (state) => state.favorites.items;
export const favoritesReducer = favoritesSlice.reducer;
