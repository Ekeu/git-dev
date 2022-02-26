import { SET_NOTIFICATION } from './NotificationTypes';

export const setNotification = (payload) => ({
  type: SET_NOTIFICATION,
  payload,
});
