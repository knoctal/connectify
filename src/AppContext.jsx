import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";
import { useQuery } from "react-query";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [theme, setTheme] = useState(null);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [threadText, setThreadText] = useState("");
  const [postPic, setPostPic] = useState("");
  const [userPosts, setUserPosts] = useState([]);

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

  const fetchUserDetails = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("usersDetails")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (error) {
      console.error("Error fetching user details:", error.message);
    } else {
      setUserName(data.user_name);
      setFullName(data.full_name);
      setBio(data.user_bio);
      setLink(data.user_link);

      const { publicURL, error: urlError } = supabase.storage
        .from("profile_picture") // Replace with your actual bucket name
        .getPublicUrl(data.profile_url);

      if (urlError) {
        console.error("Error fetching profile picture URL:", urlError.message);
      } else {
        setProfilePic(data.profile_url);
      }
    }
    return data;
  };

  const { data, isLoading, error } = useQuery("userDetails", fetchUserDetails, {
    staleTime: 5000,
  });

  const fetchUserPosts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("posts")
      .select("post_text, post_image")
      .eq("user_id", user.id);

    if (error) {
      console.error("Error fetching user posts:", error.message);
    } else {
      setUserPosts(data);
    }
    return data;
  };

  const {
    data: postsData,
    error: postError,
    isLoading: postLoading,
  } = useQuery("posts", fetchUserPosts);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
  const data = useContext(AppContext);
  if (!data) {
    throw new Error("chin tapak dam dam");
  }
  return data;
}
