export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
  isFavorite?: boolean;
  isNew?: boolean;
};

type ErrorType = null | string;

export type PostsStateType = {
  posts: PostType[],
  filteredPost: PostType[],
  postsPerPage: number,
  errors: {
    fetchPostsErr: ErrorType;
    changePostErr: ErrorType;
    addPost: ErrorType;
  },
  isLoadings: {
    fetchPostsLoading: boolean;
    changePostLoading: boolean;
    addPostLoading: boolean;
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

export type CommentsSelectorType = {
  comments: {
    [key: string]: CommentType[];
  },
};
export type InitialCommentsType = {
  comments: {
    [key: string]: CommentType[];
  },
  [Symbol.iterator]?: Iterable<CommentType>,
};

export type ActionCommentsById = {
  type: string;
  payload: {
    payload: number;
    comments: CommentsType;
  };
};

export type ActionSaga = {
  type: string;
  payload: number;
};

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type UserDataType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type UserPostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type UserPayloadType = {
  type: string;
  payload: number;
};

export type ActionSagaUser = {
  payload: number;
};

export type ActionUserType = {
  type: string;
  payload: UserDataType[] | UserPostType[];
};

export type ActionErrorsType = {
  type: string;
  payload?: string;
};

export type InitialStateUserType = {
  userData: UserDataType[];
  userPosts: UserPostType[];
};
