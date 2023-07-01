import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { createUrl, modifyPosts } from '../utils/utils';
import { PostsStateType, PostType } from '../types';
import { PostsFiltersStateType } from './filtersSlice';

type BodyType = {
  title: string;
  body: string;
  userId: number;
  id?: number;
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const createdUrl = createUrl('posts');
    const { data }: { data: PostType[] } = await axios.get(createdUrl);
    return data;
  },
);

export const addPost = createAsyncThunk(
  'posts/addPost',
  async (body: BodyType) => {
    const createdUrl = createUrl('posts');
    const { data }: { data: PostType } = await axios.post(createdUrl, {
      ...body,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data;
  },
);

export const changePost = createAsyncThunk(
  'posts/changePost',
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
    addPost: null,
  },
  isLoadings: {
    fetchPostsLoading: false,
    changePostLoading: false,
    addPostLoading: false,
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
    removePosts: (state, { payload }: PayloadAction<number[]>) => {
      state.posts = state.posts.filter((post) => !payload.includes(post.id));
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
      })

      .addCase(addPost.pending, (state) => {
        state.errors.addPost = null;
        state.isLoadings.addPostLoading = true;
      })
      .addCase(addPost.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.addPost = payload;
        state.isLoadings.addPostLoading = false;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts, { ...payload, isNew: true }];
        state.errors.addPost = null;
        state.isLoadings.addPostLoading = false;
      });
  },
});

export const {
  removePost,
  removePosts,
  setFavoritePost,
  setPostsPerPage,
  makeFiltersPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
