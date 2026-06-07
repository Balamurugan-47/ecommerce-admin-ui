import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (userData) => {

    localStorage.setItem(
      "token",
      userData.jwtToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

      if (userData.tenant) {
    localStorage.setItem(
      "tenant",
      JSON.stringify(userData.tenant)
    );
  }

  // Store tenantId separately
  if (userData.tenantId) {
    localStorage.setItem(
      "tenantId",
      userData.tenantId
    );
  }

    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);