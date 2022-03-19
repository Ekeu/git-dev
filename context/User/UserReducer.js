import {
  SET_USER,
  UPDATE_USER_POSTS_CLONED,
  UPDATE_USER_POSTS_LIKED,
} from './UserTypes';

const userReducer = (state, action) => {
  const { user = {}, postsLiked = [], postsCloned = [] } = action.payload;

  switch (action.type) {
    case SET_USER:
      return { ...state, ...user };
    case UPDATE_USER_POSTS_LIKED:
      return { ...state, postsLiked: [...postsLiked] };
    case UPDATE_USER_POSTS_CLONED:
      return { ...state, postsCloned: [...postsCloned] };
    default:
      return state;
  }
};

export default userReducer;
