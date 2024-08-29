import { useMutation, useQueryClient } from "react-query";
import { supabase } from "../supabaseClient";

const handleFileUpload = async ({ file, threadText }) => {
  if (!threadText) {
    throw new Error("Thread text is required");
  }

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (userError || !user) {
    throw new Error("User not authenticated or error getting user data.");
  }

  const filePath = `${user.id}_${Date.now()}_${file.name}`;
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

  const publicURL = publicURLData?.publicUrl;
  if (!publicURL) {
    throw new Error("Public URL is not available.");
  }

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert([
      { post_image: publicURL, post_text: threadText, user_id: user.id },
    ]);

  if (postError) {
    throw new Error("Error inserting post: " + postError.message);
  }

  return postData;
};

export const useUploadPost = (toggleForm) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleFileUpload,
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toggleForm();
    },
    onError: (error) => {
      console.error("Error during post creation:", error.message);
    },
  });
};