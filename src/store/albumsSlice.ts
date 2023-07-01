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
  },
  isLoadings: {
    fetchAlbumsLoading: boolean;
    changeAlbumLoading: boolean;
  },
};

export const fetchAlbums = createAsyncThunk<AlbumType[]>('albums/fetchAlbums', async () => {
  const createdUrl: string = createUrl('albums');
  const { data }: AxiosResponse<AlbumType[]> = await axios.get(createdUrl);
  return data;
});

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
  },
  isLoadings: {
    fetchAlbumsLoading: false,
    changeAlbumLoading: false,
  },
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {
    setAlbumsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.albumsPerPage = payload;
    },
    removeAlbum: (state, { payload }: PayloadAction<number>) => {
      state.albums = state.albums.filter((album) => album.id !== payload);
    },
    removeAlbums: (state, { payload }: PayloadAction<number[]>) => {
      state.albums = state.albums.filter((album) => !(payload.includes(album.id)));
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
      .addCase(fetchAlbums.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.fetchAlbumsErr = payload;
        state.isLoadings.fetchAlbumsLoading = false;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload }: PayloadAction<AlbumType[]>) => {
        state.albums = payload;
        state.errors.fetchAlbumsErr = null;
        state.isLoadings.fetchAlbumsLoading = false;
      })

      .addCase(changeAlbum.pending, (state) => {
        state.errors.changeAlbumErr = null;
        state.isLoadings.changeAlbumLoading = true;
      })
      .addCase(changeAlbum.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.changeAlbumErr = payload;
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
  removeAlbum,
  removeAlbums,
  setFavoriteAlbum,
  filterAndSortAlbums,
} = albumsSlice.actions;
export default albumsSlice.reducer;
