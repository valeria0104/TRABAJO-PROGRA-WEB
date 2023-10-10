import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const loginUser = (userData) => {
    setCurrentUser(userData);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe ser utilizado dentro de un UserProvider");
  }
  return context;
};