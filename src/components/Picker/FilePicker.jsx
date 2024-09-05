import { CiFileOn } from "react-icons/ci";

export default function FilePicker({ handleFileChange }) {
  return (
    <label className="cursor-pointer text-gray-400 flex items-center">
      <CiFileOn size={22} />
      <input
        type="file"
        className="hidden"
        id="input-files"
        onChange={handleFileChange}
      />
    </label>
  );
}
