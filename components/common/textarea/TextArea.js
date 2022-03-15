import React, { forwardRef } from 'react';

const TextArea = forwardRef(
  (
    {
      id,
      label,
      labelClassName,
      containerClassName,
      textAreaBodyClassName,
      textAreaClassName,
      ...otherProps
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        <label
          htmlFor={id}
          className={`block text-sm font-inter font-medium text-slate-800 ${labelClassName}`}
        >
          {label}
        </label>
        <div className={`mt-1 ${textAreaBodyClassName}`}>
          <textarea
            ref={ref}
            className={`shadow-sm focus:ring-violet-800 focus:border-violet-800 block w-full sm:text-base font-hind border-slate-300 placeholder-slate-500 text-slate-800 rounded-md ${textAreaClassName}`}
            {...otherProps}
          />
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
