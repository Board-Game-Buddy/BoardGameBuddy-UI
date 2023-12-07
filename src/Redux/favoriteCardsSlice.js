import { createSlice } from '@reduxjs/toolkit';

const favoriteCardsSlice = createSlice({
  name: 'favoriteCards',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      return [...state, action.payload];
    },
    removeFavorite: (state, action) => {
      return state.filter((id) => id !== action.payload)
    }
  }
})

export const { addFavorite, removeFavorite } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;