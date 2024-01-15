import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {},
  reducers: {
    addUserProfile: (state, action) => {
        const { userID, userData } = action.payload;
        state[userID] = userData;
      },
    updateUserProfile: (state, action) => {
      const { userID, savedGames } = action.payload;
      // Update the user's profile with saved games data
      state[userID] = { ...state[userID], savedGames };
    },
    removeUserProfile: (state, action) => {
      const { userID } = action.payload;
      delete state[userID];
    }
  },
});

export const { addUserProfile, updateUserProfile, removeUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;