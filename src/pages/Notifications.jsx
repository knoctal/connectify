import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import Sidebar from "../components/Sidebar";
import Dropdown from "../components/Dropdown";
import { FaSpinner } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const fetchNotifications = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return notifications;
};

export default function Notifications() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const dropdownOptions = [
    "Activity",
    "All",
    "Follows",
    "Replies",
    "Mentions",
    "Quotes",
    "Reposts",
    "Verified",
  ];

  return (
    <div>
      <div className="relative min-h-screen dark:bg-black dark:text-white">
        <Sidebar />
        <div className="centered-div mt-0 bg-white dark:bg-black dark:text-white">
          <Dropdown options={dropdownOptions} />
          <div className="md:fixed md:flex md:flex-col items-center justify-center top-10 left-0 right-0 mt-4 dark:bg-black dark:text-white">
            <div className="width-height mt-0 p-5">
              {isLoading && (
                <div className="flex items-center justify-center">
                  <FaSpinner
                    className="animate-spin dark:text-gray-500 "
                    size={15}
                  />
                </div>
              )}
              {isError && (
                <div className="flex items-center justify-center text-red-500">
                  <p>Error loading notifications</p>
                </div>
              )}
              {data?.length > 0 ? (
                data.map((notification) => (
                  <div
                    key={notification.notification_id}
                    className="flex items-center gap-4 p-2 border-b border-gray-500/50"
                  >
                    {notification.profile_url ? (
                      <img
                        src={notification.profile_url}
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <CgProfile className="w-10 h-10" />
                    )}
                    <div className="md:w-96 w-60">
                      <p>{notification.message}</p>
                      <small>
                        {new Date(notification.created_at).toLocaleString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          }
                        )}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center text-gray-500">
                  <p>THERE`S NOTHING WE CAN SHOW</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
