import React, { createContext, useReducer } from 'react';
import { toast } from 'react-toastify';

import Notification from '../../components/notification/notification';
import { setNotification } from './NotificationActions';
import { notificationReducer } from './NotificationReducer';

export const NotificationContext = createContext();

const NotificationProvider = NotificationContext.Provider;

export const NotificationWrapper = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, {
    open: false,
    icon: {
      className: '',
      Component: () => <></>,
    },
    headline: '',
    message: '',
    type: '',
    avatarURL: '',
    avatarAlt: '',
    actionHandlers: {},
    actionHandler: null,
    actionHandlerText: '',
  });

  const openNotification = () => {
    toast(
      <Notification
        type={notification.type}
        Icon={notification.icon.Component}
        iconClassName={notification.icon.className}
        message={notification.message}
        headline={notification.headline}
        avatarURL={notification.avatarURL}
        avatarAlt={notification.avatarAlt}
        actionHandlers={notification.actionHandlers}
        actionHandler={notification.actionHandler}
        actionHandlerText={notification.actionHandlerText}
      />,
      {
        onClose: () => dispatch(setNotification({ open: false })),
        closeOnClick: false,
        toastId: notification.message,
      }
    );
  };
  return (
    <NotificationProvider value={{ notification, dispatch }}>
      {children}
      {notification.open && openNotification()}
    </NotificationProvider>
  );
};
