import React from 'react';
import PropTypes from 'prop-types';
import { CubeTransparentIcon } from '@heroicons/react/solid';

const Button = ({
  type,
  loading,
  children,
  disabled,
  leadingIcon: LeadingIcon,
  leadingIconClassName,
  trailingIcon: TrailingIcon,
  trailingIconClassName,
  className,
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-hind font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${
        loading && 'cursor-not-allowed'
      } ${className}`}
    >
      {LeadingIcon && (
        <LeadingIcon className={`-ml-1 mr-2 h-5 w-5 ${leadingIconClassName}`} />
      )}
      {children}
      {TrailingIcon && (
        <TrailingIcon
          className={`ml-2 -mr-1 h-5 w-5 ${trailingIconClassName}`}
        />
      )}
    </button>
  );
};

Button.propTypes = {};

Button.defaultProps = {
  type: 'button',
  loading: false,
  disabled: false,
  leadingIconClassName: '',
  trailingIconClassName: '',
  className: '',
};

export default Button;
