import { useApp } from "../AppContext";
import { useApp } from "../AppContext";
import { supabase } from "../supabaseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleFileUpload = async ({ file, threadText, user, username }) => {
  if (!threadText && !file) {
    throw new Error("Thread text or file is required");
  }

  let publicURL = null;

  if (file) {
    const filePath = `${user.id}_${Date.now()}_${file.name}`; // Unique file path
    const { data, error } = await supabase.storage
      .from("posts_images")
      .upload(filePath, file);

    if (error) {
      throw new Error("Error uploading file: " + error.message);
    }

    const { data: publicURLData, error: urlError } = supabase.storage
      .from("posts_images")
      .getPublicUrl(filePath);

    if (urlError) {
      throw new Error("Failed to generate public URL: " + urlError.message);
    }

    publicURL = publicURLData?.publicUrl;
    if (!publicURL) {
      throw new Error("Public URL is not available.");
    }
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert([
      {
        post_image: publicURL,
        post_text: threadText,
        user_id: user.id,
        post_author: username,
        created_at: new Date().toISOString(),
      },
    ]);

  if (postError) {
    throw new Error("Error inserting post: " + postError.message);
  }

  return postData;
};

export const useUploadPost = (toggleForm) => {
  const queryClient = useQueryClient();
  const { userDetails } = useApp();
  const { userDetails } = useApp();

  return useMutation({
    mutationFn: async ({ file, threadText }) => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      const user = userData?.user;

      if (userError || !user) {
        throw new Error("User not authenticated or error getting user data.");
      }

      return handleFileUpload({
        file,
        threadText,
        user,
        username: userDetails?.user_name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toggleForm();
    },
    onError: (error) => {
      console.error("Error during post creation:", error.message);
    },
  });
};
