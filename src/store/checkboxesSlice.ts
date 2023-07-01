import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  activeCheckboxesPosts: number[],
  activeCheckboxesAlbums: number[],
};
const initialState: InitialStateType = {
  activeCheckboxesPosts: [],
  activeCheckboxesAlbums: [],
};

const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    addCheckboxPosts: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesPosts = [...state.activeCheckboxesPosts, payload];
    },
    addCheckboxAlbums: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesAlbums = [...state.activeCheckboxesAlbums, payload];
    },
    removeCheckboxPosts: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesPosts = state.activeCheckboxesPosts
        .filter((checkbox) => checkbox !== payload);
    },
    removeCheckboxAlbums: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesAlbums = state
        .activeCheckboxesAlbums.filter((checkbox) => checkbox !== payload);
    },
    clearCheckboxesPosts: (state) => {
      state.activeCheckboxesPosts = [];
    },
    clearCheckboxesAlbums: (state) => {
      state.activeCheckboxesAlbums = [];
    },
  },
});

export const {
  addCheckboxPosts,
  addCheckboxAlbums,
  removeCheckboxPosts,
  removeCheckboxAlbums,
  clearCheckboxesPosts,
  clearCheckboxesAlbums,
} = checkboxesSlice.actions;
export default checkboxesSlice.reducer;
