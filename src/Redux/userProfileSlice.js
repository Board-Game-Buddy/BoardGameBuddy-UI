import { createSlice } from '@reduxjs/toolkit';

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {},
  reducers: {
    addUserProfile: (state, action) => {
        const { userID, userData } = action.payload;
        state[userID] = userData;
        console.log('addUserProfile reducer called. New state:', state);
      },
    updateUserProfile: (state, action) => {
      const { userID, savedGames } = action.payload;
      // Update the user's profile with saved games data
      state[userID] = { ...state[userID], savedGames };
      console.log('updateUserProfile reducer called. New state:', state);
    },
    removeUserProfile: (state, action) => {
      const { userID } = action.payload;
      delete state[userID];
      console.log('removeUserProfile reducer called. New state:', state);
    }
  },
});

export const { addUserProfile, updateUserProfile, removeUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;