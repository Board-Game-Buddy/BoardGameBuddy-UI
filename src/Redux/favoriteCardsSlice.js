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
      state[userID].push(cardID);
    },
    removeFavorite: (state, action) => {
      const { userID, cardID } = action.payload;
      if (state[userID]) {
        state[userID] = state[userID].filter((id) => id !== cardID);
      }
    },
    updateFavoriteStatus: (state, action) => {
      const { gameID, isFavorite } = action.payload;
      // Find the game in the state and update its isFavorite status
      Object.keys(state).forEach((userID) => {
        state[userID] = state[userID].map((id) => (id === gameID ? { ...id, isFavorite } : id));
      });
    },
    initFavorites: (state, action) => {
      const { userID, favorites } = action.payload;
      state[userID] = favorites;
    },
  },
});

export const { addFavorite, removeFavorite, updateFavoriteStatus, initFavorites } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;
