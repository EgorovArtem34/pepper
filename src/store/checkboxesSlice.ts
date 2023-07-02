import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  activeCheckboxesPosts: number[],
  activeCheckboxesAlbums: number[],
  activeCheckboxesTodos: number[],
};
const initialState: InitialStateType = {
  activeCheckboxesPosts: [],
  activeCheckboxesAlbums: [],
  activeCheckboxesTodos: [],
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
    addCheckboxTodos: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesTodos = [...state.activeCheckboxesTodos, payload];
    },
    removeCheckboxPosts: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesPosts = state.activeCheckboxesPosts
        .filter((checkbox) => checkbox !== payload);
    },
    removeCheckboxAlbums: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesAlbums = state
        .activeCheckboxesAlbums.filter((checkbox) => checkbox !== payload);
    },
    removeCheckboxTodos: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxesTodos = state
        .activeCheckboxesTodos.filter((checkbox) => checkbox !== payload);
    },
    clearCheckboxesPosts: (state) => {
      state.activeCheckboxesPosts = [];
    },
    clearCheckboxesAlbums: (state) => {
      state.activeCheckboxesAlbums = [];
    },
    clearCheckboxesTodos: (state) => {
      state.activeCheckboxesTodos = [];
    },
  },
});

export const {
  addCheckboxPosts,
  addCheckboxAlbums,
  addCheckboxTodos,
  removeCheckboxPosts,
  removeCheckboxAlbums,
  removeCheckboxTodos,
  clearCheckboxesPosts,
  clearCheckboxesAlbums,
  clearCheckboxesTodos,
} = checkboxesSlice.actions;
export default checkboxesSlice.reducer;
