import {
  UPDATE_POST_CLONES,
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_POSTS,
} from './PostTypes';

const postReducer = (state = [], action) => {
  const {
    postID = null,
    posts = [],
    post = {},
    userID = null,
    postLikes = [],
    postClones = [],
  } = action.payload;

  switch (action.type) {
    case SET_POSTS:
      return [...posts];

    case DELETE_POST:
      return [...state].filter((post) => post._id !== postID);

    case CREATE_POST:
      return [post, ...state];

    case LIKE_POST:
      return [...state].map((post) => {
        if (post._id === postID) {
          return {
            ...post,
            postLikes,
          };
        }

        return post;
      });
    case UPDATE_POST_CLONES:
      return [...state].map((post) => {
        if (post._id === postID) {
          return {
            ...post,
            postClones,
          };
        }

        return post;
      });

    default:
      return state;
  }
};

export default postReducer;
