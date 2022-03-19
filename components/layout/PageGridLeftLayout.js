import React from 'react';

const PageGridLeftLayout = ({ children }) => {
  return (
    <div className='hidden lg:block lg:col-span-3 xl:col-span-3'>
      <nav
        aria-label='Sidebar'
        className='sticky top-28 divide-y divide-slate-300'
      >
        {children}
      </nav>
    </div>
  );
};

export default PageGridLeftLayout;
