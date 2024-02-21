import { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  toast: {
    message: null,
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
  isAdmin: false,
  setIsAdmin: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("CURRENT_USER");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [userToken, _setUserToken] = useState(() => localStorage.getItem("TOKEN") || "");
  const [toast, setToast] = useState({ message: "", show: false });
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("IS_ADMIN") === "true");
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("IS_AUTHENTICATED") === "true");

  useEffect(() => {
    localStorage.setItem("TOKEN", userToken);
  }, [userToken]);

  useEffect(() => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("IS_ADMIN", isAdmin);
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem("IS_AUTHENTICATED", isAuthenticated);
  }, [isAuthenticated]);

  const setUserToken = (token) => {
    _setUserToken(token);
  };

  const showToast = (message) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 5000);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        toast,
        showToast,
        isAdmin,
        setIsAdmin,
        isAuthenticated,
        setIsAuthenticated, 
      }}
    >
            {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
