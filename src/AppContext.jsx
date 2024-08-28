import { useQuery } from "react-query";
import { supabase } from "./supabaseClient";
import Skeleton from "./components/Skeleton";
import { createContext, useState, useEffect, useContext } from "react";

// Create a context
const AppContext = createContext();

// Function to fetch user details
const fetchUserDetails = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("usersDetails")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error(`Error fetching user details: ${error.message}`);
  }

  return data;
};

// Function to fetch user posts
const fetchUserPosts = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("posts")
    .select("post_text, post_image")
    .eq("user_id", user.id);

  if (error) {
    throw new Error(`Error fetching user posts: ${error.message}`);
  }

  return data;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [threadText, setThreadText] = useState("");

  // Handle theme changes
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

  const { data: userDetails, error: userError } = useQuery(
    "userDetails",
    fetchUserDetails,
    {
      onSuccess: (data) => {
        if (data) {
          setUserName(data.user_name);
          setFullName(data.full_name);
          setBio(data.user_bio);
          setLink(data.user_link);

          // Fetch profile picture URL
          const { publicURL, error: urlError } = supabase.storage
            .from("profile_picture")
            .getPublicUrl(data.profile_url);

          if (urlError) {
            console.error(
              "Error fetching profile picture URL:",
              urlError.message
            );
          } else {
            setProfilePic(data.profile_url);
          }
        }
      },
    }
  );

  // Fetch user posts and update state
  const {
    data: userPostsData,
    error: postsError,
    isLoading,
  } = useQuery("posts", fetchUserPosts, {
    onSuccess: (data) => {
      setUserPosts(data);
    },
  });

  if (isLoading)
    return (
      <div>
        <Skeleton />
      </div>
    );
  if (userError || postsError)
    return <div>Error: {userError?.message || postsError?.message}</div>;

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
        threadText,
        setThreadText,
        profilePic,
        setProfilePic,
        userPosts,
        setUserPosts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use app context
export function useApp() {
  const data = useContext(AppContext);
  if (!data) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return data;
}
