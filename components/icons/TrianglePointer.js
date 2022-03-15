import React from 'react';

const TrianglePointer = ({ className }) => {
  return (
    <svg viewBox='0 0 24 24' aria-hidden='true' className={className}>
      <g>
        <path d='M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z'></path>
      </g>
    </svg>
  );
};

export default TrianglePointer;