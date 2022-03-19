import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../spinner/Spinner';

const Button = forwardRef(
  (
    {
      type,
      loading,
      children,
      disabled,
      leadingIcon: LeadingIcon,
      leadingIconClassName,
      trailingIcon: TrailingIcon,
      trailingIconClassName,
      className,
      spinnerClassName,
      ...otherProps
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={loading || disabled}
        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-hind font-medium rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 ${
          (loading || disabled) && 'cursor-not-allowed'
        } ${className}`}
        {...otherProps}
      >
        {LeadingIcon && !loading && (
          <LeadingIcon
            className={`-ml-1 mr-2 h-5 w-5 ${leadingIconClassName}`}
          />
        )}
        {loading && (
          <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
            <Spinner
              className={`h-5 w-5 ${spinnerClassName}`}
              aria-hidden='true'
            />
          </span>
        )}
        {children}
        {TrailingIcon && (
          <TrailingIcon
            className={`ml-2 -mr-1 h-5 w-5 ${trailingIconClassName}`}
          />
        )}
      </button>
    );
  }
);

Button.propTypes = {};

Button.displayName = 'Button';

Button.defaultProps = {
  type: 'button',
  loading: false,
  disabled: false,
  leadingIconClassName: '',
  trailingIconClassName: '',
  spinnerClassName: '',
  className: '',
};

export default Button;
