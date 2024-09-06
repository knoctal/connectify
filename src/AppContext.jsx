import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect, useContext } from "react";
import { fetchUserDetails, fetchUserPosts } from "./supabaseClient";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [threadText, setThreadText] = useState("");
  const [postPic, setPostPic] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    // Apply theme based on state
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

  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userDetails"],
    queryFn: fetchUserDetails,
    staleTime: 5000,
  });

  const {
    data: userPosts = [],
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchUserPosts,
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        userDetails,
        threadText,
        setThreadText,
        postPic,
        setPostPic,
        bio,
        setBio,
        link,
        setLink,
        userPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
