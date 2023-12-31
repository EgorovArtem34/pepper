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
    try {
      const { data }: { data: PostType[] } = await axios.get(createdUrl);
      return data;
    } catch (err: any) {
      throw err.message;
    }
  },
);

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (id: number) => {
    const createdUrl = createUrl('posts', id);
    try {
      const { status } = await axios.delete(createdUrl);
      if (status === 200) {
        return id;
      }
      throw new Error();
    } catch (err: any) {
      throw err.message;
    }
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
    removePostErr: null,
    addPostErr: null,
  },
  isLoadings: {
    fetchPostsLoading: false,
    changePostLoading: false,
    addPostLoading: false,
    removePostLoading: false,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsPerPage: (state, { payload }: PayloadAction<number>) => {
      state.postsPerPage = payload;
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
      .addCase(fetchPosts.rejected, (state) => {
        // state.errors.fetchPostsErr = payload.message;
        state.errors.fetchPostsErr = 'fetchPostsErr';
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
        state.errors.addPostErr = null;
        state.isLoadings.addPostLoading = true;
      })
      .addCase(addPost.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.addPostErr = payload.message;
        state.isLoadings.addPostLoading = false;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts = [...state.posts, { ...payload, isNew: true }];
        state.errors.addPostErr = null;
        state.isLoadings.addPostLoading = false;
      })

      .addCase(removePost.pending, (state) => {
        state.errors.removePostErr = null;
        state.isLoadings.removePostLoading = true;
      })
      .addCase(removePost.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.removePostErr = payload.message;
        state.isLoadings.removePostLoading = false;
      })
      .addCase(removePost.fulfilled, (state, { payload }) => {
        state.posts = state.posts.filter((post) => post.id !== payload);
        state.errors.removePostErr = null;
        state.isLoadings.removePostLoading = false;
      });
  },
});

export const {
  setFavoritePost,
  setPostsPerPage,
  makeFiltersPosts,
} = postsSlice.actions;
export default postsSlice.reducer;
