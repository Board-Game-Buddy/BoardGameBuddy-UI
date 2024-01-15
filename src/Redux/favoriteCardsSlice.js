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
      console.log('addFavorite reducer called. New state:', state);
      return {
        ...state,
        [userID]: [...state[userID], cardID],
      };
    },
    removeFavorite: (state, action) => {
      const { userID, cardID } = action.payload;
      if (state[userID]) {
        console.log('removeFavorite reducer called. New state:', state);
        return {
          ...state,
          [userID]: state[userID].filter((id) => id !== cardID),
        };
      }
      console.log('removeFavorite reducer called with invalid userID. Current state:', state);
      return state;
    },
    initFavorites: (state, action) => {
      const { userID, favorites } = action.payload;
      console.log('initFavorites reducer called. New state:', state);
      return {
        ...state,
        [userID]: favorites,
      };
    },
  }
});

export const { addFavorite, removeFavorite, updateFavoriteStatus, initFavorites, updateFavoriteStatusForGame } = favoriteCardsSlice.actions;
export default favoriteCardsSlice.reducer;
