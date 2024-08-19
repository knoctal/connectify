import { useState } from "react";
import { useApp } from "../AppContext";
import { supabase } from "../supabaseClient";

export default function UpdateProfile() {
  const { profilePic, setProfilePic } = useApp();
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setErrorMessage("Please select a file!");
      return;
    }

    try {
      setUploading(true);
      setErrorMessage("");

      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        setErrorMessage("User not authenticated!");
        return;
      }

      const filePath = `${user.id}_${Date.now()}_${file.name}`;

      // Upload file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("profile_picture")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      console.log("File uploaded successfully:", uploadData);

      // Retrieve the public URL for the uploaded file
      const { data: publicURLData, error: urlError } = supabase.storage
        .from("profile_picture")
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      const publicURL = publicURLData?.publicUrl;
      console.log("Public URL of the uploaded file:", publicURL);

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

      // Update the profile picture in the app's state
      setProfilePic(publicURL);
    } catch (error) {
      console.error("File upload error:", error.message);
      setErrorMessage("File upload failed, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-full w-14 h-14">
      <input type="file" onChange={handleFileUpload} />
      {uploading && <p>Uploading...</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {profilePic && <img src={profilePic} alt="Profile" />}
    </div>
  );
}
