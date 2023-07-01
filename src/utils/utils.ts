import { PostType } from '../types';

const url = 'https://jsonplaceholder.typicode.com';
export const createUrl = (resources: string, id?: number, type?: string): string => [url, resources, id, type].join('/');

export const createPageNumbers = (posts: number, postsPerPage: number) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};

export const setFavoriteLocalStorage = (id: number, newFavoriteValue: boolean, type: string) => {
  const favoritesLocalStorage = JSON.parse(localStorage.getItem(type) ?? '[]');
  const updatedFavorites = newFavoriteValue
    ? [...favoritesLocalStorage, id]
    : favoritesLocalStorage.filter((favoriteId: number) => favoriteId !== id);

  if (updatedFavorites.length === 0) {
    localStorage.removeItem(type);
  } else {
    localStorage.setItem(type, JSON.stringify(updatedFavorites));
  }
};

export const filterFavoritesLocalStorage = (ids: number[], type: string) => {
  const favorites: number[] = JSON.parse(localStorage.getItem(type) ?? JSON.stringify([]));
  if (favorites.length === 0) {
    return null;
  }
  const filteredFavorites = favorites.filter((favorite) => !(ids.includes(favorite)));

  if (filteredFavorites.length === 0) {
    localStorage.removeItem(type);
  } else {
    localStorage.setItem(type, JSON.stringify(filteredFavorites));
  }
  return null;
};

export const modifyPosts = (posts: PostType[]) => {
  const favorites = JSON.parse(localStorage.getItem('favoritesPosts') ?? JSON.stringify([]));
  return posts.map((post: PostType) => ({
    ...post,
    isFavorite: favorites.includes(post.id),
  }));
};

export const setValuesPerPageLocalStorage = (valuesPerPage: number, type: string) => {
  switch (type) {
    case 'posts':
      localStorage.setItem('postsPerPage', JSON.stringify(valuesPerPage));
      break;
    case 'albums':
      localStorage.setItem('albumsPerPage', JSON.stringify(valuesPerPage));
      break;
    default: break;
  }
};

export const defineTextModal = (typeModal: string) => {
  let textModal = '';
  switch (typeModal) {
    case 'deletePost':
      textModal = 'пост';
      break;
    case 'deleteAlbum':
      textModal = 'альбом';
      break;
    default:
      break;
  }
  return textModal;
};
