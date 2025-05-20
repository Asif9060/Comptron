import { createContext, useState } from 'react';

// Create a context for IsAdmin
export const AdminContext = createContext();

// Create a provider component
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false); // Initial state

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};