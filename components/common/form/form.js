import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ className, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit} className={className || 'space-y-6'}>
      {children}
    </form>
  );
};

Form.propTypes = {};

export default Form;
