//Changed

import { useState } from "react";
import { useApp } from "../AppContext";
import { Avatar } from "../../lib/data/Icons";
import { supabase } from "../supabaseClient";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const uploadProfilePic = async (file) => {
  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;
  if (!user) {
    throw new Error("User not authenticated!");
  }

  const filePath = `${user.id}_${Date.now()}_${file.name}`;

  // Upload file to Supabase storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("profile_picture")
    .upload(filePath, file, { upsert: true });

  if (uploadError) {
    throw uploadError;
  }

  // Retrieve the public URL for the uploaded file
  const { data: publicURLData, error: urlError } = supabase.storage
    .from("profile_picture")
    .getPublicUrl(filePath);

  if (urlError) {
    throw urlError;
  }

  const publicURL = publicURLData?.publicUrl;
  if (!publicURL) {
    throw new Error("Failed to retrieve the public URL.");
  }

  // Update the user's profile picture URL in the database
  const { error: updateError } = await supabase
    .from("usersDetails")
    .update({ profile_url: publicURL })
    .eq("user_id", user.id);

  if (updateError) {
    throw updateError;
  }

  return publicURL;
};

export default function UpdateProfile() {
  const { userDetails } = useApp();
  const [profilePic, setProfilePic] = useState(userDetails?.profile_url);
  const [showFileInput, setShowFileInput] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // New state for upload status

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadProfilePic,
    onMutate: () => {
      setUploadStatus("Uploading...");
      setShowFileInput(false);
    },
    onSuccess: (publicURL) => {
      setProfilePic(publicURL);
      setUploadStatus("Profile picture uploaded successfully!");
      queryClient.invalidateQueries(["userDetails"]); // Invalidate the query to refetch the user details
    },
    onError: (error) => {
      setUploadStatus(`Error: ${error.message}`);
    },
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      mutation.mutate(file);
    }
  };

  return (
    <div className="relative">
      {profilePic ? (
        <img
          src={profilePic}
          onClick={() => setShowFileInput((prev) => !prev)} // Show file input on image click
          className="w-14 h-14 rounded-full object-cover cursor-pointer"
        />
      ) : (
        <Avatar size={30} />
      )}

      {/* Conditionally render the file input */}
      {showFileInput && (
        <input
          type="file"
          onChange={handleFileUpload}
          className="w-56 mt-3 absolute right-1"
        />
      )}

      {uploadStatus && (
        <div className="left-[38%] message">
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  );
}
