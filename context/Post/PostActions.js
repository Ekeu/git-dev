import { SET_POST, UPDATE_COMMENT, UPDATE_COMMENTS } from './PostTypes';

export const setPost = (data) => {
  console.log(data);
  return {
    type: SET_POST,
    payload: {
      data,
    },
  };
};

export const updateComments = (comments) => {
  return {
    type: UPDATE_COMMENTS,
    payload: {
      comments,
    },
  };
};

export const updateComment = (updatedComment) => {
  return {
    type: UPDATE_COMMENT,
    payload: {
      updatedComment,
    },
  };
};

export const deleteComment = (commentID) => {
  return {
    type: DELETE_COMMENT,
    payload: {
      commentID,
    },
  };
};
