import { useState, createContext } from "react";

export const UserContext = createContext({ name: "", token: "", auth: false });

export const UserProvider = ({ children }) => {
  //user is the name of 'data' that gets stored in context
  const [user, setUser] = useState({ name: "", token: "", auth: false });

  const login = (name, token) => {
    setUser((user) => ({
      name: name,
      token: token,
      auth: true,
    }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser((user) => ({
      name: "",
      token: "",
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
