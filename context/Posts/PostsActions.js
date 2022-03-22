import {
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_POSTS,
  UPDATE_POST_CLONES,
} from './PostsTypes';

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: {
    posts,
  },
});

export const deletePost = (postID) => ({
  type: DELETE_POST,
  payload: {
    postID,
  },
});

export const updatePostLikes = (postLikes, postID, isClone) => ({
  type: LIKE_POST,
  payload: {
    postLikes,
    postID,
    isClone,
  },
});
export const updatePostClones = (postClones, postID) => ({
  type: UPDATE_POST_CLONES,
  payload: {
    postClones,
    postID,
  },
});

export const createPost = (post) => ({
  type: CREATE_POST,
  payload: {
    post,
  },
});
