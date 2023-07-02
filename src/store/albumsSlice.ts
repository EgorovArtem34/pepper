import axios, { AxiosResponse } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUrl } from '../utils/utils';
import { ErrorType } from '../types';
import { AlbumsFiltersSortStateType } from './filtersSlice';

export type AlbumType = {
  userId: number;
  id: number;
  title: string;
  isFavorite?: boolean;
};

type BodyType = {
  title: string;
  userId: number;
  id: number;
};

export type AlbumsStateType = {
  albums: AlbumType[],
  filteredAndSortedAlbums: AlbumType[],
  albumsPerPage: number,
  errors: {
    fetchAlbumsErr: ErrorType;
    changeAlbumErr: ErrorType;
    removeAlbumErr: ErrorType;
  },
  isLoadings: {
    fetchAlbumsLoading: boolean;
    changeAlbumLoading: boolean;
    removeAlbumLoading: boolean;
  },
};

export const fetchAlbums = createAsyncThunk<AlbumType[]>('albums/fetchAlbums', async () => {
  const createdUrl: string = createUrl('albums');
  const { data }: AxiosResponse<AlbumType[]> = await axios.get(createdUrl);
  return data;
});

export const removeAlbum = createAsyncThunk(
  'albums/removeAlbum',
  async (id: number) => {
    const createdUrl = createUrl('albums', id);
    const { status } = await axios.delete(createdUrl);
    if (status === 200) {
      return id;
    }
    return status;
  },
);

export const changeAlbum = createAsyncThunk(
  'albums/changeAlbum',
  async (body: BodyType) => {
    const createdUrl = createUrl('albums', body.id);
    const { data }: { data: AlbumType } = await axios.put(createdUrl, {
      ...body,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data;
  },
);

const initialState: AlbumsStateType = {
  albums: [],
  filteredAndSortedAlbums: [],
  albumsPerPage: 10,
  errors: {
    fetchAlbumsErr: null,
    changeAlbumErr: null,
    removeAlbumErr: null,
  },
  isLoadings: {
    fetchAlbumsLoading: false,
    changeAlbumLoading: false,
    removeAlbumLoading: false,
  },
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbumsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.albumsPerPage = payload;
    },
    setFavoriteAlbum: (state, { payload }: PayloadAction<number>) => {
      const currentAlbum = state.albums.find((album) => album.id === payload);
      if (currentAlbum) {
        currentAlbum.isFavorite = !(currentAlbum.isFavorite);
      }
    },
    filterAndSortAlbums: (state, { payload }: PayloadAction<AlbumsFiltersSortStateType>) => {
      const { queryParams, status } = payload;
      let currentAlbums = state.albums;

      if (status.isFilterByTitleActive) {
        currentAlbums = currentAlbums
          .filter((album) => album.title.includes(queryParams.queryParamsByTitle as string));
      }
      if (status.isFilterByFavoriteActive) {
        currentAlbums = currentAlbums.filter((album) => album.isFavorite);
      }
      if (status.isFilterByByUsersActive) {
        currentAlbums = currentAlbums
          .filter((album) => queryParams.queryParamsByUsers?.includes(album.userId));
      }
      if (status.sortBy) {
        currentAlbums = currentAlbums.slice().sort((a, b) => {
          if (queryParams.sortOrder === 'ascend') {
            switch (status.sortBy) {
              case 'id':
                return a.id - b.id;
              case 'userId':
                return a.userId - b.userId;
              case 'title':
                return a.title.localeCompare(b.title);
              default: return 0;
            }
          } else {
            switch (status.sortBy) {
              case 'id':
                return b.id - a.id;
              case 'userId':
                return b.userId - a.userId;
              case 'title':
                return b.title.localeCompare(a.title);
              default: return 0;
            }
          }
        });
      }
      state.filteredAndSortedAlbums = currentAlbums;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.errors.fetchAlbumsErr = null;
        state.isLoadings.fetchAlbumsLoading = true;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.errors.fetchAlbumsErr = 'fetchAlbumsErr';
        state.isLoadings.fetchAlbumsLoading = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }: PayloadAction<AlbumType[]>) => {
        state.albums = payload;
        state.errors.fetchAlbumsErr = null;
        state.isLoadings.fetchAlbumsLoading = false;
      })

      .addCase(removeAlbum.pending, (state) => {
        state.errors.removeAlbumErr = null;
        state.isLoadings.removeAlbumLoading = true;
      })
      .addCase(removeAlbum.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.removeAlbumErr = payload.message;
        state.isLoadings.removeAlbumLoading = false;
      })
      .addCase(removeAlbum.fulfilled, (state, { payload }: PayloadAction<number>) => {
        state.albums = state.albums.filter((album) => album.id !== payload);
        state.errors.removeAlbumErr = null;
        state.isLoadings.removeAlbumLoading = false;
      })

      .addCase(changeAlbum.pending, (state) => {
        state.errors.changeAlbumErr = null;
        state.isLoadings.changeAlbumLoading = true;
      })
      .addCase(changeAlbum.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.changeAlbumErr = payload.message;
        state.isLoadings.changeAlbumLoading = false;
      })
      .addCase(changeAlbum.fulfilled, (state, { payload }: PayloadAction<AlbumType>) => {
        const currentIndex = state.albums.findIndex((album) => album.id === payload.id);
        if (currentIndex !== -1) {
          state.albums[currentIndex] = payload;
        }
        state.errors.changeAlbumErr = null;
        state.isLoadings.changeAlbumLoading = false;
      });
  },
});

export const {
  setAlbumsPerPage,
  setFavoriteAlbum,
  filterAndSortAlbums,
} = albumsSlice.actions;
export default albumsSlice.reducer;
