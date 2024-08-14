import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const data = useContext(AppContext);
  if (!data) {
    throw new Error("chin tapak dam dam");
  }
  return data;
}
