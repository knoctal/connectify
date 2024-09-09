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
    .select(
      " *"
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
};


export const fetchPostDetails = async (postId) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("post_id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};



export async function fetchComments(postId) {
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .eq("post_id", postId);

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data;
}
