import {
  DELETE_COMMENT,
  SET_POST,
  UPDATE_COMMENT,
  UPDATE_COMMENTS,
} from './PostTypes';

const userReducer = (state, action) => {
  const {
    data = {},
    comments = [],
    updatedComment = {},
    commentID = null,
  } = action.payload;

  let newComments;

  switch (action.type) {
    case SET_POST:
      return { ...state, ...data };
    case UPDATE_COMMENTS:
      return { ...state, comments: [...state.comments, ...comments] };
    case UPDATE_COMMENT:
      newComments = [...state.comments];
      const updatedCommentIndex = newComments.findIndex(
        (comment) => comment._id === updatedComment._id
      );
      newComments.splice(updatedCommentIndex, 1, updatedComment);
      return { ...state, comments: newComments };
    case DELETE_COMMENT:
      newComments = [...state.comments];
      const deletedCommentIndex = newComments.findIndex(
        (comment) => comment._id === commentID
      );
      newComments.splice(deletedCommentIndex, 1);
      return { ...state, comments: newComments };
    default:
      return state;
  }
};

export default userReducer;
