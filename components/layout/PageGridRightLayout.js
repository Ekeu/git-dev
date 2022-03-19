import React from 'react';

const PageGridRightLayout = ({ children }) => {
  return (
    <aside className='hidden xl:block xl:col-span-3'>
      <div className='sticky top-28 space-y-4'>{children}</div>
    </aside>
  );
};

export default PageGridRightLayout;
