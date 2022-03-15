import React, { useReducer, createContext } from 'react';

import postReducer from './PostReducer';

export const PostContext = createContext();

export const PostProvider = PostContext.Provider;

export const PostWrapper = ({ children }) => {
  const [posts, dispatch] = useReducer(postReducer, []);

  return <PostProvider value={{ posts, dispatch }}>{children}</PostProvider>;
};
