import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialStateType = {
  activeCheckboxes: number[],
};
const initialState: InitialStateType = {
  activeCheckboxes: [],
};

const checkboxesSlice = createSlice({
  name: 'checkboxes',
  initialState,
  reducers: {
    addCheckbox: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxes = [...state.activeCheckboxes, payload];
    },
    removeCheckbox: (state, { payload }: PayloadAction<number>) => {
      state.activeCheckboxes = state.activeCheckboxes.filter((checkbox) => checkbox !== payload);
    },
    clearCheckboxesState: () => initialState,
  },
});

export const {
  addCheckbox,
  removeCheckbox,
  clearCheckboxesState,
} = checkboxesSlice.actions;
export default checkboxesSlice.reducer;
