import { supabase } from "./supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [theme, setTheme] = useState(null);
  const [postPic, setPostPic] = useState("");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [threadText, setThreadText] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  // Theme handling
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

  // Fetch user details
  const fetchUserDetails = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error(userError?.message || "User not found");
    }

    const { data, error } = await supabase
      .from("usersDetails")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    setUserName(data.user_name);
    setFullName(data.full_name);
    setBio(data.user_bio);
    setLink(data.user_link);

    const { publicURL, error: urlError } = supabase.storage
      .from("profile_picture")
      .getPublicUrl(data.profile_url);

    if (urlError) {
      throw new Error(urlError.message);
    }

    setProfilePic(data.profile_url);
    return data;
  };

  // Fetch user posts
  const fetchUserPosts = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error(userError?.message || "User not found");
    }

    const { data, error } = await supabase
      .from("posts")
      .select("post_text, post_image")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }); // Order posts by created_at in descending order

    if (error) {
      throw new Error(error.message);
    }

    setUserPosts(data);
    return data;
  };

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
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchUserPosts,
  });

  if (userLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  if (userError || postsError) {
    return <div>Error: {userError?.message || postsError?.message}</div>;
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        userName,
        setUserName,
        fullName,
        setFullName,
        bio,
        setBio,
        link,
        setLink,
        profilePic,
        setProfilePic,
        threadText,
        setThreadText,
        postPic,
        setPostPic,
        userPosts,
        setUserPosts,
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
