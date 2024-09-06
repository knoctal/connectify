import { useState } from "react";
import { useApp } from "../AppContext";
import Sidebar from "../components/Sidebar";
import ProfileInfo from "../components/ProfileInfo";
import ProfileForm from "../components/ProfileForm";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState("profile");
  const { usersDetails } = useApp();
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
      <div className=" md:fixed inset-0 flex flex-col items-center justify-center">
        <h3 className="md:font-semibold md:mt-5 md:p-1 hidden md:block">
          Profile
        </h3>
        <div className="centered-div mt-10 md:mt-0">
          <div className="width-height mt-0">
            <ProfileInfo
              onEditClick={handleEditClick}
              userName={usersDetails?.userName}
              fullName={usersDetails?.fullName}
              bio={usersDetails?.bio}
              link={usersDetails?.link}
            />
            {isEditing && (
              <ProfileForm
                section={editSection}
                onClose={closeForm}
                onSectionChange={handleSectionClick}
                userName={usersDetails?.userName}
                fullName={usersDetails?.fullName}
                bio={usersDetails?.bio}
                link={usersDetails?.link}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
