import { SET_NOTIFICATION } from './NotificationTypes';

const notificationReducer = (state, action) => {
  const { open, ...rest } = action.payload;
  switch (action.type) {
    case SET_NOTIFICATION:
      if (open === false) return { ...state, open };
      return {
        ...state,
        ...rest,
        open: true,
      };
    default:
      return state;
  }
};

export default notificationReducer;
