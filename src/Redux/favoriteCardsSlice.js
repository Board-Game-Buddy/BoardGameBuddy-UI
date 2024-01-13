import { createSlice } from '@reduxjs/toolkit';

const favoriteCardsSlice = createSlice({
  name: 'favoriteCards',
  initialState: {},
  reducers: {
    // addFavorite: (state, action) => {
    //   const { userID, cardID } = action.payload;
    //   if (!state[userID]) {
    //     state[userID] = [];
    //   }
    //   state[userID].push(cardID);
    // },
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
    updateFavoriteStatusForGame: (state, action) => {
      const { userID, gameID, isFavorite } = action.payload;
      if (!state[userID]) {
        state[userID] = [];
      }
      const index = state[userID].findIndex((favorite) => favorite.id === gameID);
      if (index !== -1) {
        state[userID][index].isFavorite = isFavorite;
      }
    },
  }
});

export const { addFavorite, removeFavorite, updateFavoriteStatus, initFavorites, updateFavoriteStatusForGame } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;
