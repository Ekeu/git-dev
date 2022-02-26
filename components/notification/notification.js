import React from 'react';
import PropTypes from 'prop-types';
import CondensedNotification from './condensed';
import SimpleNotification from './simple';
import AvatarNotification from './avatar';
import ActionsNotification from './actions';

const Notification = ({
  type,
  Icon,
  message,
  headline,
  avatarURL,
  avatarAlt,
  closeToast,
  iconClassName,
  actionHandlers,
  actionHandler,
  actionHandlerText,
}) => {
  return (
    <div
      className={`${
        type === 'avatar' ? 'max-w-md flex' : 'max-w-sm'
      } w-full bg-white font-hind shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}
    >
      {type === 'condensed' && (
        <CondensedNotification
          type={type}
          message={message}
          iconClassName={iconClassName}
          actionHandler={actionHandler}
          actionHandlerText={actionHandlerText}
          closeNotification={closeToast}
        />
      )}
      {type === 'simple' && (
        <SimpleNotification
          type={type}
          Icon={Icon}
          message={message}
          headline={headline}
          iconClassName={iconClassName}
          closeNotification={closeToast}
        />
      )}
      {type === 'avatar' && (
        <AvatarNotification
          type={type}
          Icon={Icon}
          message={message}
          headline={headline}
          avatarAlt={avatarAlt}
          avatarURL={avatarURL}
          actionHandler={actionHandler}
          iconClassName={iconClassName}
          closeNotification={closeToast}
          actionHandlerText={actionHandlerText}
        />
      )}
      {type === 'actions' && (
        <ActionsNotification
          type={type}
          Icon={Icon}
          message={message}
          headline={headline}
          iconClassName={iconClassName}
          closeNotification={closeToast}
          actionHandlers={actionHandlers}
        />
      )}
    </div>
  );
};

Notification.propTypes = {};

export default Notification;
