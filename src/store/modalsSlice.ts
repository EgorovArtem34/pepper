import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsStateType = {
  isModalShow: boolean,
  typeModal: string,
  activePostId: null | number,
};
type PayloadType = {
  typeModal: string;
  id?: number;
};

const initialState: ModalsStateType = {
  isModalShow: false,
  typeModal: '',
  activePostId: null,
};
const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setShowModal: (state, { payload }: PayloadAction<PayloadType>) => {
      const { typeModal, id = null } = payload;
      state.typeModal = typeModal;
      if (id) {
        state.activePostId = id;
      }
      state.isModalShow = true;
    },
    setCloseModal: () => initialState,
  },
});

export const { setShowModal, setCloseModal } = modalsSlice.actions;
export default modalsSlice.reducer;
