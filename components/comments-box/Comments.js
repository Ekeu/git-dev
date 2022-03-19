import React, { useContext } from 'react';
import { UserContext } from '../../context';

import TopCommentsBox from './comments-box/top-comments-box/TopCommentsBox';
import CommentsScroll from './CommentsScroll';

const Comments = () => {
  const { user } = useContext(UserContext);

  return (
    <section aria-describedby='comments-section'>
      <TopCommentsBox user={user} />
      <CommentsScroll user={user} />
    </section>
  );
};

export default Comments;
