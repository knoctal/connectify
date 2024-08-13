import Sidebar from "../components/Sidebar";

export default function Notifications() {
  return (
    <div>
      <div className="relative min-h-screen">
        <Sidebar />
        <div className="md:fixed absolute inset-0 flex flex-col items-center justify-center">
          <h3 className="md:font-semibold mt-12 md:p-1 hidden md:block">
            Activity
          </h3>
          <div className="centered-div mt-0">
            {/* Fixed height and scrollable content */}
            <div className="width-height mt-0">
              <p>NOTHING TO SHOW</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
