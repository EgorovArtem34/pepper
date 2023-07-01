import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUrl } from '../utils/utils';

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

type PhotosStateType = {
  photos: PhotoType[];
  error: string | null;
  isLoading: boolean;
  currentPhoto: PhotoType | null;
};

export const fetchPhotosByAlbumId = createAsyncThunk<PhotoType[], number>('photos/fetchPhotosByAlbumId', async (id: number) => {
  const createdUrl: string = createUrl('albums', id, 'photos');
  const { data }: AxiosResponse<PhotoType[]> = await axios.get(createdUrl);
  return data;
});

const initialState: PhotosStateType = {
  photos: [],
  error: null,
  isLoading: false,
  currentPhoto: null,
};

const photosSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPhoto: (state, { payload }: PayloadAction<PhotoType>) => {
      state.currentPhoto = payload;
    },
    clearCurrentPhoto: (state) => {
      state.currentPhoto = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosByAlbumId.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(fetchPhotosByAlbumId.rejected, (state, { payload }: PayloadAction<any>) => {
        state.error = payload;
        state.isLoading = false;
      })
      .addCase(fetchPhotosByAlbumId.fulfilled, (state, { payload }: PayloadAction<PhotoType[]>) => {
        state.error = null;
        state.photos = payload;
        state.isLoading = false;
      });
  },
});

export const { setCurrentPhoto, clearCurrentPhoto } = photosSlice.actions;
export default photosSlice.reducer;
