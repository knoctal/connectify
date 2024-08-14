import { useState, useEffect } from "react";

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
    <div className="relative min-h-screen dark:bg-gray-950 dark:text-white">
      <Sidebar />
      <div className="absolute left-24 inset-0 flex flex-col items-center justify-center dark:bg-gray-950 dark:text-white">
        <h3 className="md:font-semibold mt-4 md:p-2 hidden md:block">
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