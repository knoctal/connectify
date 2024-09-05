// //Changed

// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// export const fetchUserDetails = async () => {
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();
//   if (userError || !user)
//     throw new Error(userError?.message || "User not found");

//   const { data, error } = await supabase
//     .from("usersDetails")
//     .select("*")
//     .eq("user_id", user.id)
//     .single();

//   if (error) throw new Error(error.message);

//   const { publicURL, error: urlError } = supabase.storage
//     .from("profile_picture")
//     .getPublicUrl(data.profile_url);

//   if (urlError) throw new Error(urlError.message);

//   return { ...data, profilePic: publicURL };
// };

// export const fetchUserPosts = async () => {
//   const {
//     data: { user },
//     error: userError,
//   } = await supabase.auth.getUser();
//   if (userError || !user)
//     throw new Error(userError?.message || "User not found");

//   const { data, error } = await supabase
//     .from("posts")
//     .select("post_id,post_text, post_image,like_count")
//     .order("created_at", { ascending: false });

//   if (error) throw new Error(error.message);

//   return data;
// };

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const fetchUserDetails = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user)
    throw new Error(userError?.message || "User not found");

  const { data, error } = await supabase
    .from("usersDetails")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw new Error(error.message);

  const { publicURL, error: urlError } = supabase.storage
    .from("profile_picture")
    .getPublicUrl(data.profile_url);

  if (urlError) throw new Error(urlError.message);

  return { ...data, profilePic: publicURL };
};

export const fetchUserPosts = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user)
    throw new Error(userError?.message || "User not found");

  const { data, error } = await supabase
    .from("posts")
    .select(" post_id , like_count, post_text, post_image, post_author")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};
