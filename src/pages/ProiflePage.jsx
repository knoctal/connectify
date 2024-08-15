import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState("profile");

  const handleEditClick = () => {
    setIsEditing(true);
    setEditSection("profile");
  };

  const handleSectionClick = (section) => {
    setEditSection(section);
  };

  const closeForm = () => {
    setIsEditing(false);
    setEditSection("profile");
  };

  return (
    <div className="relative min-h-screen dark:bg-black dark:text-white">
      <Sidebar />
      <div className="md:fixed md:flex md:flex-col items-center justify-center mt-10 md:mt-0 top-0 left-0 right-0 dark:bg-black dark:text-white">
        <h3 className="md:font-semibold md:p-2 hidden md:block mt-4">
          Profile
        </h3>
        <ProfileInfo onEditClick={handleEditClick} />
        {isEditing && (
          <ProfileForm
            section={editSection}
            onClose={closeForm}
            onSectionChange={handleSectionClick}
          />
        )}
      </div>
    </div>
  );
}
