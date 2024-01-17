import { configureStore } from '@reduxjs/toolkit';
import favoriteCardsReducer from './favoriteCardsSlice';
import userProfileReducer from './userProfileSlice';

const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    favoriteCards: favoriteCardsReducer,
  },
})

export default store;