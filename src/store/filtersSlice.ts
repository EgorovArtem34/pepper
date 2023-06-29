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
type InitialStateType = {
  posts: PostsFiltersStateType;
};

const initialState: InitialStateType = {
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
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterByTitle: (state, { payload }: PayloadAction<string>) => {
      state.posts.queryParams.queryParamsByTitle = payload;
      state.posts.status.isFilterByTitleActive = true;
    },
    setFilterByUsers: (state, { payload }: PayloadAction<number[]>) => {
      state.posts.queryParams.queryParamsByUsers = payload;
      state.posts.status.isFilterByByUsersActive = true;
    },
    setFilterByFavorite: (state) => {
      state.posts.queryParams.queryParamsByFavorite = true;
      state.posts.status.isFilterByFavoriteActive = true;
    },
    setSortBy: (state, { payload }: PayloadAction<SortPayload>) => {
      const { sortBy, sortOrder } = payload;
      state.posts.status.sortBy = sortBy;
      state.posts.queryParams.sortOrder = sortOrder;
    },

    unsetFilterBy: (state, { payload }: PayloadAction<keyof StatusFiltersType>) => {
      state.posts.queryParams[payload as keyof typeof state.posts.queryParams] = null;
      state.posts.status[payload] = false;
    },
    unsetSort: (state) => {
      state.posts.queryParams.sortOrder = 'ascend';
      state.posts.status.sortBy = false;
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
