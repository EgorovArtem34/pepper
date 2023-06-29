import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createUrl, modifyPosts } from '../utils/utils';
import { PostsStateType, PostType } from '../types';
import { PostsFiltersStateType } from './filtersSlice';

export const fetchPosts = createAsyncThunk(
  'user/fetchPosts',
  async () => {
    const createdUrl = createUrl('posts');
    const { data }: { data: PostType[] } = await axios.get(createdUrl);
    return data;
  },
);

type BodyType = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export const changePost = createAsyncThunk(
  'user/changePost',
  async (body: BodyType) => {
    const createdUrl = createUrl('posts', body.id);
    const { data }: { data: PostType } = await axios.put(createdUrl, {
      ...body,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data;
  },
);

const initialState: PostsStateType = {
  posts: [],
  filteredPost: [],
  postsPerPage: 10,
  errors: {
    fetchPostsErr: null,
    changePostErr: null,
  },
  isLoadings: {
    fetchPostsLoading: false,
    changePostLoading: false,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.postsPerPage = payload;
    },
    removePost: (state, { payload }: PayloadAction<number>) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    makeFiltersPosts: (state, { payload }: PayloadAction<PostsFiltersStateType>) => {
      const { queryParams, status } = payload;
      let filteredPosts = state.posts;

      if (status.isFilterByTitleActive) {
        filteredPosts = filteredPosts
          .filter((post) => post.title.includes(queryParams.queryParamsByTitle as string));
      }
      if (status.isFilterByFavoriteActive) {
        filteredPosts = filteredPosts.filter((post) => post.isFavorite);
      }
      if (status.isFilterByByUsersActive) {
        filteredPosts = filteredPosts
          .filter((post) => queryParams.queryParamsByUsers?.includes(post.userId));
      }
      if (status.sortBy) {
        filteredPosts = filteredPosts.slice().sort((a, b) => {
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

      state.filteredPost = filteredPosts;
    },
    setFavoritePost: (state, { payload }: PayloadAction<number>) => {
      const currentPost = state.posts.find((post) => post.id === payload);
      if (currentPost) {
        currentPost.isFavorite = !(currentPost.isFavorite);
      }
    },
    filterPostsByTitle: (state, { payload }: PayloadAction<string>) => {
      state.filteredPost = state.filteredPost.length > 0
        ? state.filteredPost.filter((post) => post.title.includes(payload))
        : state.posts.filter((post) => post.title.includes(payload));
    },
    setFilteredPostByUsers: (state, { payload }: PayloadAction<number[]>) => {
      state.filteredPost = state.posts.filter((post) => payload.includes(post.userId));
    },
    filteredPostByFavorite: (state, { payload }: PayloadAction<boolean>) => {
      if (payload) {
        state.filteredPost = state.filteredPost.filter((post) => post.isFavorite);
      } else {
        state.filteredPost = state.posts.filter((post) => post.isFavorite);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.errors.fetchPostsErr = null;
        state.isLoadings.fetchPostsLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.fetchPostsErr = payload;
        state.isLoadings.fetchPostsLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        if (payload) {
          const modifiedPosts = modifyPosts(payload);
          state.posts = modifiedPosts;
        }
        state.errors.fetchPostsErr = null;
        state.isLoadings.fetchPostsLoading = false;
      })

      .addCase(changePost.pending, (state) => {
        state.errors.changePostErr = null;
        state.isLoadings.changePostLoading = true;
      })
      .addCase(changePost.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.changePostErr = payload;
        state.isLoadings.changePostLoading = false;
      })
      .addCase(changePost.fulfilled, (state, { payload }) => {
        const currentIndex = state.posts.findIndex((post) => post.id === payload.id);
        if (currentIndex !== -1) {
          state.posts[currentIndex] = payload;
        }
        state.errors.changePostErr = null;
        state.isLoadings.changePostLoading = false;
      });
  },
});

export const {
  removePost,
  setFavoritePost,
  setPostsPerPage,
  filterPostsByTitle,
  setFilteredPostByUsers,
  filteredPostByFavorite,
  makeFiltersPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
