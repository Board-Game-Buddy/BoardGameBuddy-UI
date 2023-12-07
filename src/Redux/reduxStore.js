import { configureStore } from '@reduxjs/toolkit';
import favoriteCardsReducer from './favoriteCardsSlice';

const store = configureStore({
  reducer: {
    favoriteCards: favoriteCardsReducer,
  },
})

export default store;