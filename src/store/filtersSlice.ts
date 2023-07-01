import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortType = 'id' | 'title' | 'userId' | boolean;
export type SortOrderType = 'ascend' | 'descend';
export type StatusFiltersType = {
  isFilterByTitleActive: boolean,
  isFilterByByUsersActive: boolean,
  isFilterByFavoriteActive: boolean,
};
export type StatusSortType = {
  sortBy: SortType,
};
export interface SortPayload {
  sortBy: SortType;
  sortOrder: SortOrderType;
}
export type PostsFiltersStateType = {
  status: StatusFiltersType & StatusSortType;
  queryParams: {
    queryParamsByTitle: string | null;
    queryParamsByUsers: number[] | null;
    queryParamsByFavorite: boolean | null;
    sortOrder: SortOrderType | null | keyof StatusSortType,
  };
};
export type AlbumsFiltersSortStateType = PostsFiltersStateType;
export type InitialFiltersStateType = {
  posts: PostsFiltersStateType;
  albums: AlbumsFiltersSortStateType;
};

const initialState: InitialFiltersStateType = {
  posts: {
    status: {
      isFilterByTitleActive: false,
      isFilterByByUsersActive: false,
      isFilterByFavoriteActive: false,
      sortBy: false,
    },
    queryParams: {
      queryParamsByTitle: null,
      queryParamsByUsers: null,
      queryParamsByFavorite: null,
      sortOrder: 'ascend',
    },
  },
  albums: {
    status: {
      isFilterByTitleActive: false,
      isFilterByByUsersActive: false,
      isFilterByFavoriteActive: false,
      sortBy: false,
    },
    queryParams: {
      queryParamsByTitle: null,
      queryParamsByUsers: null,
      queryParamsByFavorite: null,
      sortOrder: 'ascend',
    },
  },
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterByTitle: (state, { payload }: PayloadAction<{
      target: keyof InitialFiltersStateType,
      value: string
    }>) => {
      const { target, value } = payload;
      state[target].queryParams.queryParamsByTitle = value;
      state[target].status.isFilterByTitleActive = true;
    },
    setFilterByUsers: (state, { payload }: PayloadAction<{
      target: keyof InitialFiltersStateType,
      value: number[]
    }>) => {
      const { target, value } = payload;
      state[target].queryParams.queryParamsByUsers = value;
      state[target].status.isFilterByByUsersActive = true;
    },
    setFilterByFavorite: (state, { payload }: PayloadAction<keyof InitialFiltersStateType>) => {
      const target = payload;
      state[target].queryParams.queryParamsByFavorite = true;
      state[target].status.isFilterByFavoriteActive = true;
    },
    setSortBy: (state, { payload }: PayloadAction<{
      target: keyof InitialFiltersStateType,
      sortBy: SortType,
      sortOrder: SortOrderType
    }>) => {
      const { target, sortBy, sortOrder } = payload;
      state[target].status.sortBy = sortBy;
      state[target].queryParams.sortOrder = sortOrder;
    },
    unsetFilterBy: (state, { payload }: PayloadAction<{
      target: keyof InitialFiltersStateType,
      filter: keyof StatusFiltersType
    }>) => {
      const { target, filter } = payload;
      state[target].queryParams[filter as keyof typeof state.posts.queryParams] = null;
      state[target].status[filter] = false;
    },
    unsetSort: (state, { payload }: PayloadAction<keyof InitialFiltersStateType>) => {
      state[payload].queryParams.sortOrder = 'ascend';
      state[payload].status.sortBy = false;
    },
  },
});

export const {
  setFilterByTitle,
  setFilterByUsers,
  setFilterByFavorite,
  unsetFilterBy,
  setSortBy,
  unsetSort,

} = filtersSlice.actions;
export default filtersSlice.reducer;
