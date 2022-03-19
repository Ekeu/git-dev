import React from 'react';

const PageGridLayout = ({ children }) => {
  return (
    <div className='max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8'>
      {children}
    </div>
  );
};

export default PageGridLayout;
