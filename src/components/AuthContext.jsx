import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Retrieve the authentication status from local storage
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth ? JSON.parse(storedAuth) : false;
  });

  const [userType, setUserType] = useState(() => {
    // Retrieve the user type from local storage
    return localStorage.getItem("userType") || "";
  });

  const signin = () => {
    setIsAuthenticated(true);
    setUserType(userType); // Set user type
    localStorage.setItem("isAuthenticated", true); // Store authentication status
    localStorage.setItem("userType", userType); // Store user type
  };

  const signout = () => {
    setIsAuthenticated(false);
    setUserType(""); // Clear user type
    localStorage.removeItem("isAuthenticated"); // Remove authentication status
    localStorage.removeItem("userType"); // Remove user type
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUserType = localStorage.getItem("userType");
    if (storedAuth) {
      setIsAuthenticated(JSON.parse(storedAuth));
    }
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  console.log(userType)

  return (
    <AuthContext.Provider value={{ isAuthenticated,userType, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
