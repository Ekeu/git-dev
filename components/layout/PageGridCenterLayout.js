import React from 'react';

const PageGridCenterLayout = ({ children }) => {
  return <main className='lg:col-span-9 xl:col-span-6 mt-2'>{children}</main>;
};

export default PageGridCenterLayout;
