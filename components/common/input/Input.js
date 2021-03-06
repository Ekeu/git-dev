import React, { cloneElement, forwardRef, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/solid';

const InputErrorAndHelp = ({ id, content, className }) => {
  return (
    <p id={id} className={`mt-2 text-sm ${className}`}>
      {content}
    </p>
  );
};

const InputIcon = ({ Icon, iconClassName, iconContainerClassName }) => {
  return (
    <div
      className={`absolute inset-y-0 flex items-center ${iconContainerClassName}`}
    >
      {isValidElement(Icon) ? (
        cloneElement(Icon, { className: iconClassName })
      ) : (
        <Icon className={iconClassName} aria-hidden='true' />
      )}
    </div>
  );
};

const isObject = (obj) => obj instanceof Object;

const Input = forwardRef(
  (
    {
      id,
      label,
      success,
      register,
      cornerHint,
      cornerHindId,
      inputHelpText,
      inputClassName,
      labelClassName,
      inputBodyClassName,
      registerErrorMessage,
      leadingIconClassName,
      trailingIconClassName,
      inputContainerClassName,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      leadingIconContainerClassName,
      trailingIconContainerClassName,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className={`${inputContainerClassName}`}>
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-slate-800 font-inter ${labelClassName}`}
        >
          {label}
        </label>
        {cornerHint && (
          <span className='text-sm text-slate-500' id={cornerHindId}>
            {cornerHint}
          </span>
        )}
        <div
          className={`mt-1 relative rounded-md shadow-sm ${inputBodyClassName}`}
        >
          {LeadingIcon && (
            <InputIcon
              Icon={LeadingIcon}
              iconClassName={leadingIconClassName}
              iconContainerClassName={`left-0 pl-3 ${leadingIconContainerClassName}`}
            />
          )}
          <input
            id={id}
            ref={ref}
            {...otherProps}
            {...register}
            className={`appearance-none placeholder:tracking-tight px-3 py-2 shadow-sm focus:outline-none focus:ring-violet-800 block w-full font-hind sm:text-sm ${
              isObject(registerErrorMessage) || registerErrorMessage
                ? 'border-red-300 text-red-800 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
                : success
                ? 'border-emerald-300 text-slate-80 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-slate-300 placeholder-slate-500 text-slate-800'
            } rounded-md ${LeadingIcon && 'pl-10'} ${
              TrailingIcon && 'pr-10'
            } ${inputClassName}`}
          />
          {!registerErrorMessage && TrailingIcon && (
            <InputIcon
              Icon={TrailingIcon}
              iconClassName={trailingIconClassName}
              iconContainerClassName={`right-0 pr-3 ${trailingIconContainerClassName}`}
            />
          )}

          {registerErrorMessage && (
            <InputIcon
              Icon={ExclamationCircleIcon}
              iconClassName={'h-5 w-5 text-red-500'}
              iconContainerClassName={`right-0 pr-3 pointer-events-none`}
            />
          )}
        </div>
        {!registerErrorMessage && inputHelpText && (
          <InputErrorAndHelp
            id={`${id}-description`}
            className={'text-slate-500'}
            content={inputHelpText}
          />
        )}
        {!isObject(registerErrorMessage) && registerErrorMessage && (
          <InputErrorAndHelp
            id={`${id}-error`}
            className={'text-red-600'}
            content={registerErrorMessage}
          />
        )}
      </div>
    );
  }
);

Input.defaultProps = {
  id: '',
  label: '',
  success: false,
  cornerHint: '',
  cornerHindId: '',
  inputHelpText: '',
  inputClassName: '',
  labelClassName: '',
  inputBodyClassName: '',
  registerErrorMessage: '',
  leadingIconClassName: '',
  trailingIconClassName: '',
  inputContainerClassName: '',
  leadingIconContainerClassName: '',
  trailingIconContainerClassName: '',
};

Input.displayName = 'Input';
export default Input;
