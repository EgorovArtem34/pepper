export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
  isFavorite?: boolean;
  isNew?: boolean;
};

export type ErrorType = null | string;

export type PostsStateType = {
  posts: PostType[],
  filteredPost: PostType[],
  postsPerPage: number,
  errors: {
    fetchPostsErr: ErrorType;
    changePostErr: ErrorType;
    addPostErr: ErrorType;
    removePostErr: ErrorType;
  },
  isLoadings: {
    fetchPostsLoading: boolean;
    changePostLoading: boolean;
    addPostLoading: boolean;
    removePostLoading: boolean;
  },
};

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type CommentsStateType = {
  comments: {
    [key: string]: CommentType[];
  },
  isLoading: boolean,
  error: string | null,
};

export type CommentsType = {
  comments: CommentType[];
};

export interface CommentProps {
  comment: CommentType,
  isLoading: boolean,
  error: string | null,
}

export type UserType = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
};

export type InputNameType = 'title' | 'body' | 'userId';
export type StatusFiltersTodosType = {
  isFilterByTitleActive: boolean,
  isFilterByByCompleted: boolean,
  isFilterByWorking: boolean,
};
export type SortTodosType = 'completed' | 'unCompleted' | boolean;
export type StatusSortTodosType = {
  sortBy: boolean,
};
export type TodosFilterSortStateType = {
  status: StatusFiltersTodosType & StatusSortTodosType;
  queryParams: {
    queryParamsByTitle: string | null;
    sortOrder: SortTodosType | null | keyof StatusSortTodosType,
  }
};
