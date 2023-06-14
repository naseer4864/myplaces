import { createContext, useCallback, useEffect, useState } from "react";

export const UserContext = createContext({
  isLoggedIn: false,
  token: null,
  userId: null,
  Login: () => {},
  Logout: () => {},
});

export const UserProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [userId, setUserId] = useState(false);

  const Login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationDate", tokenExpirationDate);
  }, []);

  const Logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }, []);

  useEffect(() => {
    const handleTokenChange = (event) => {
      if (event.key === "token") {
        const newToken = event.newValue;
        if (!newToken) {
          Logout(); // Token has been removed, perform logout
        } else if (newToken !== token) {
          setToken(newToken); // Token has been changed, update the token
        }
      }
    };

    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, [token, Logout]);

  useEffect(() => {
    if (token) {
      const tokenExpirationDate = localStorage.getItem("expirationDate");
      if (tokenExpirationDate && new Date(tokenExpirationDate) <= new Date()) {
        Logout(); // Token has expired, perform logout
      }
    }
  }, [token, Logout]);

  const value = { isLoggedIn: !!token, userId, Login, Logout, token: token };

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
