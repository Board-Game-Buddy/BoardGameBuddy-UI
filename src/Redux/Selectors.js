import { createSelector } from 'reselect';

const userFavesSelector = (state) => state.favoriteCards[currentUser] || [];

export const memoizedUserFavesSelector = createSelector(
  [userFavesSelector],
  (userFaves) => userFaves
);