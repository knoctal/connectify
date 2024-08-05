import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        confirmMessage,
        setConfirmMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
