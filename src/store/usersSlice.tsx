import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUrl } from '../utils/utils';
import { UserType } from '../types';

type UsersState = {
  users: UserType[];
  error: string | null;
  isLoading: boolean;
};

export const fetchUsers = createAsyncThunk<UserType[]>('users/fetchUsers', async () => {
  const createdUrl: string = createUrl('users');
  const { data }: AxiosResponse<UserType[]> = await axios.get(createdUrl);
  return data;
});

const initialState: UsersState = {
  users: [],
  error: null,
  isLoading: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state: UsersState) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchUsers.rejected, (state: UsersState, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state: UsersState, { payload }: PayloadAction<UserType[]>) => {
          state.error = null;
          state.users = payload;
          state.isLoading = false;
        },
      );
  },
});

// export const {} = usersSlice.actions;
export default usersSlice.reducer;
