import React from 'react';
import CustomNotification from './custom';
import Button from '../common/button/button';
import { XIcon } from '@heroicons/react/solid';

const NotificationContent = ({ message, headline }) => {
  return (
    <>
      <p className='text-sm font-medium font-lato text-slate-800'>{headline}</p>
      <p className='mt-1 text-sm font-hind text-slate-500'>{message}</p>
    </>
  );
};

const SimpleNotification = ({
  type,
  Icon,
  message,
  headline,
  iconClassName,
  closeNotification,
}) => {
  return (
    <CustomNotification
      type={type}
      Icon={Icon}
      iconClassName={iconClassName}
      ContentComponent={
        <NotificationContent message={message} headline={headline} />
      }
      contentClassName={'ml-3 pt-0.5'}
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

export default SimpleNotification;
