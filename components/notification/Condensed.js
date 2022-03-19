import React from 'react';
import CustomNotification from './Custom';
import Button from '../common/button/Button';
import { XIcon } from '@heroicons/react/solid';

const NotificationContent = ({ message, actionHandler, actionHandlerText }) => {
  return (
    <>
      <p className='w-0 flex-1 text-sm font-medium font-hind text-slate-800'>
        {message}
      </p>
      {actionHandler && (
        <Button
          onClick={actionHandler}
          className={
            'ml-3 flex-shrink-0 bg-white !rounded-md text-violet-600 hover:text-violet-500 !p-0 !shadow-none'
          }
        >
          {actionHandlerText}
        </Button>
      )}
    </>
  );
};

const CondensedNotification = ({
  type,
  message,
  actionHandler,
  iconClassName,
  actionHandlerText,
  closeNotification,
}) => {
  return (
    <CustomNotification
      type={type}
      iconClassName={iconClassName}
      ContentComponent={
        <NotificationContent
          message={message}
          actionHandler={actionHandler}
          actionHandlerText={actionHandlerText}
        />
      }
      contentClassName={'flex justify-between'}
      actionButtonsContainerClassName={'ml-4 flex-shrink-0 flex'}
    >
      <Button
        onClick={closeNotification}
        className={
          'bg-white !rounded-md text-slate-400 hover:text-slate-500 !p-0 !shadow-none'
        }
      >
        <span className='sr-only'>Close</span>
        <XIcon className='h-5 w-5' aria-hidden='true' />
      </Button>
    </CustomNotification>
  );
};

export default CondensedNotification;
