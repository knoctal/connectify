import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "./supabaseClient";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [profilePic, setProfilePic] = useState("");

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
          console.error(
            "Error fetching profile picture URL:",
            urlError.message
          );
        } else {
          setProfilePic(publicURL);
          console.log("Profile Picture URL:", profilePic);
        }
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
        setProfilePic(data.profile_url);
        console.log(data.profile_url);
      }
    };

    fetchUserDetails();
  }, []);

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
