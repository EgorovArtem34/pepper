import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';
import commentsSlice from './commentsSlice';
import usersSlice from './usersSlice';
import modalsSlice from './modalsSlice';
import checkboxesSlice from './checkboxesSlice';
import filtersSlice from './filtersSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    commentsSlice,
    usersSlice,
    modalsSlice,
    checkboxesSlice,
    filtersSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
