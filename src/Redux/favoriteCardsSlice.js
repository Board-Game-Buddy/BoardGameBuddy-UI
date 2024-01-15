import { createSlice } from '@reduxjs/toolkit';

const favoriteCardsSlice = createSlice({
  name: 'favoriteCards',
  initialState: {},
  reducers: {
    addFavorite: (state, action) => {
      const { userID, cardID } = action.payload;
      if (!state[userID]) {
        state[userID] = [];
      }
      // Make sure to push the cardID to the array
      state[userID].push(cardID);
    },
    removeFavorite: (state, action) => {
      const { userID, cardID } = action.payload;
      if (state[userID]) {
        state[userID] = state[userID].filter((id) => id !== cardID);
      }
    },
    initFavorites: (state, action) => {
      const { userID, favorites } = action.payload;
      state[userID] = favorites;
    },
  }
});

export const { addFavorite, removeFavorite, updateFavoriteStatus, initFavorites, updateFavoriteStatusForGame } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;
