export default function ProfileInfo({ onEditClick }) {
  return (
    <div className="width-height mt-0 dark:bg-gray-950 dark:text-white">
      <div className="width-height mt-0">
        <div className="flex p-4 justify-between md:gap-x-96">
          <div className="flex flex-col items-start">
            <h1 className="font-bold text-2xl">Full name</h1>
            <p>user_name</p>
          </div>
          <div className="md:flex w-20 h-20">
            <img
              className="rounded-full w-20 h-20"
              src="/audii.jpg"
              alt="Profile"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 w-60 ml-4 items-start md:w-96">
          <p>This is user bio</p>
          <div className="flex text-gray-500 gap-6">
            <button className="ml-6 outline-none">{6} followers</button>
            <span className="text-blue-500 dark:text-gray-500">
              youtube.com
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center mt-5 text-black font-semibold ">
          <button
            className="border border-gray-300 text-black h-10 w-72 rounded-2xl md:h-10 md:w-[550px] md:rounded-2xl md:p-1 dark:text-white dark:border-neutral-700"
            type="button"
            onClick={onEditClick}
          >
            Edit Profile
          </button>
        </div>
        <div className="mt-4 p-3 font-semibold flex items-center justify-around text-x text-gray-500/80">
          <div>Thread</div>
          <div>Replies</div>
          <div>Repost</div>
        </div>
        <hr className="border-t border-gray-300 w-full dark:border-neutral-700" />
        <div className="flex flex-col items-center justify-center mt-12">
          No Post Yet ...
        </div>
      </div>
    </div>
  );
}
