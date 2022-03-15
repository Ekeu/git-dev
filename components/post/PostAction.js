import React from 'react';

const PostAction = ({
  Icon,
  containerClassName,
  iconClassName,
  iconContainerClassName,
  buttonClassname,
  childrenClassName,
  children,
  ...rest
}) => {
  return (
    <span
      className={`inline-flex items-center font-hind text-base ${containerClassName}`}
    >
      <button
        type='button'
        {...rest}
        className={`flex space-x-2 ${buttonClassname}`}
      >
        <span className={iconContainerClassName}>
          <Icon className={`h-5 w-5 ${iconClassName}`} aria-hidden='true' />
        </span>
        <span className={`${childrenClassName}`}>{children}</span>
      </button>
    </span>
  );
};

export default PostAction;
