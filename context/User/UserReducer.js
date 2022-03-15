import {
  SET_USER,
  UPDATE_USER_POSTS_CLONED,
  UPDATE_USER_POSTS_LIKED,
} from './UserTypes';

const userReducer = (state = {}, action) => {
  const {
    user = {},
    postID = null,
    postsLiked = [],
    postsCloned = [],
  } = action.payload;

  switch (action.type) {
    case SET_USER:
      return { ...user };
    case UPDATE_USER_POSTS_LIKED:
      return { ...user, postsLiked: [...postsLiked] };
    case UPDATE_USER_POSTS_CLONED:
      return { ...user, postsCloned: [...postsCloned] };
    default:
      return state;
  }
};

export default userReducer;
