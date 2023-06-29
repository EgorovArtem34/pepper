import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createUrl } from '../utils/utils';
import { CommentType, CommentsStateType } from '../types';

export const fetchCommentsById = createAsyncThunk(
  'user/fetchCommentsById',
  async (id: number) => {
    const createdUrl = createUrl('posts', id, 'comments');
    const { data } = await axios.get<CommentType[]>(createdUrl);
    return data;
  },
);

const initialState: CommentsStateType = {
  comments: {},
  error: null,
  isLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsById.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchCommentsById.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsById.fulfilled, (state, { payload }) => {
        state.comments = {
          ...state.comments,
          [payload[0].postId]: [...payload],
        };
        state.error = null;
        state.isLoading = false;
      });
  },
});

// export const { } = commentsSlice.actions;
export default commentsSlice.reducer;
