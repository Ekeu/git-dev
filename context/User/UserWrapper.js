import React, { useReducer, createContext } from 'react';

import userReducer from './UserReducer';

export const UserContext = createContext();

const UserProvider = UserContext.Provider;

export const UserWrapper = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, {});

  return <UserProvider value={{ user, dispatch }}>{children}</UserProvider>;
};
