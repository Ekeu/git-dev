import React, { createContext, useReducer } from 'react';

import PostReducer from './PostReducer';

export const PostContext = createContext();

export const PostProvider = PostContext.Provider;

export const PostWrapper = ({ children }) => {
  const [data, dispatch] = useReducer(PostReducer, {
    post: {},
    comments: [],
    reload: false,
    update: null,
    increment: 5,
  });
  return <PostProvider value={{ data, dispatch }}>{children}</PostProvider>;
};
