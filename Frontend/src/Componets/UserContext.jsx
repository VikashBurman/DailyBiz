import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext({});

// Create a provider component
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};