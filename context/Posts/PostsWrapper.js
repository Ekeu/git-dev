import React, { useReducer, createContext } from 'react';

import postsReducer from './PostsReducer';

export const PostsContext = createContext();

export const PostsProvider = PostsContext.Provider;

export const PostsWrapper = ({ children }) => {
  const [posts, dispatch] = useReducer(postsReducer, []);

  return <PostsProvider value={{ posts, dispatch }}>{children}</PostsProvider>;
};
