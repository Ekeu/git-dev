import React from 'react';
import { MAX_CHAR_COUNT, RING_RADIUS } from '../../constants/post';

const PostCharacterCount = ({ style, numOfCharac }) => {
  const remainingChars = () => {
    if (MAX_CHAR_COUNT - numOfCharac <= 0) return 0;

    if (MAX_CHAR_COUNT - numOfCharac <= 20) return MAX_CHAR_COUNT - numOfCharac;
  };
  return (
    <div id='counter' className='flex items-center relative'>
      <svg className={`h-8 w-8`}>
        <circle
          id='slate'
          cx={'50%'}
          cy={'50%'}
          r={RING_RADIUS}
          className={'fill-transparent stroke-2 stroke-slate-400'}
        ></circle>
        <circle
          id='coloured'
          cx={'50%'}
          cy={'50%'}
          r={RING_RADIUS}
          className={'fill-transparent stroke-2'}
          style={style}
        ></circle>
      </svg>
      <span className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-sm font-hind mt-[1px]'>
        {remainingChars()}
      </span>
    </div>
  );
};

export default PostCharacterCount;
