import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';
import commentsSlice from './commentsSlice';
import usersSlice from './usersSlice';
import modalsSlice from './modalsSlice';
import checkboxesSlice from './checkboxesSlice';
import filtersSlice from './filtersSlice';
import albumsSlice from './albumsSlice';
import photosSlice from './photosSlice';
import todosSlice from './todosSlice';

const store = configureStore({
  reducer: {
    postsSlice,
    commentsSlice,
    usersSlice,
    modalsSlice,
    checkboxesSlice,
    filtersSlice,
    albumsSlice,
    photosSlice,
    todosSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
