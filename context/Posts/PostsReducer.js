import {
  UPDATE_POST_CLONES,
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  SET_POSTS,
} from './PostsTypes';

const postsReducer = (state = [], action) => {
  const {
    postID = null,
    posts = [],
    post = {},
    isClone = false,
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
          if (isClone) {
            if (post.clone) {
              return {
                ...post,
                postLikes,
              };
            }

            return {
              ...post,
              postLikes,
            };
          }
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

export default postsReducer;
