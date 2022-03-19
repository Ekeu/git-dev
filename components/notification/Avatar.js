import React from 'react';
import CustomNotification from './Custom';
import Button from '../common/button/Button';

const NotificationContent = ({ message, headline }) => {
  return (
    <>
      <p className='text-sm font-medium font-inter text-slate-800'>
        {headline}
      </p>
      <p className='mt-1 text-sm font-hind text-slate-500'>{message}</p>
    </>
  );
};

const AvatarNotification = ({
  type,
  Icon,
  message,
  headline,
  avatarURL,
  avatarAlt,
  iconClassName,
  actionHandler,
  closeNotification,
  actionHandlerText,
}) => {
  return (
    <CustomNotification
      type={type}
      Icon={Icon}
      iconClassName={iconClassName}
      avatarURL={avatarURL}
      avatarAlt={avatarAlt}
      ContentComponent={
        <NotificationContent message={message} headline={headline} />
      }
      contentClassName={'ml-3'}
      actionButtonsContainerClassName={'flex border-l border-slate-200'}
    >
      <Button
        onClick={actionHandler}
        className={
          'w-full !rounded-none !rounded-r-lg !p-4 !flex justify-center text-violet-600 hover:text-violet-500 !shadow-none'
        }
      >
        {actionHandlerText}
      </Button>
    </CustomNotification>
  );
};

export default AvatarNotification;
