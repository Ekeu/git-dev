import {
  SET_USER,
  UPDATE_USER_POSTS_CLONED,
  UPDATE_USER_POSTS_LIKED,
} from './UserTypes';

export const setUser = (user) => ({
  type: SET_USER,
  payload: {
    user,
  },
});

export const updatePostsLiked = (postsLiked) => ({
  type: UPDATE_USER_POSTS_LIKED,
  payload: {
    postsLiked,
  },
});

export const updatePostsCloned = (postsCloned) => ({
  type: UPDATE_USER_POSTS_CLONED,
  payload: {
    postsCloned,
  },
});
