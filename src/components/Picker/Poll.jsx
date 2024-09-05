export default function PollComponent({
  pollOptions,
  setPollOptions,
  pollRef,
}) {
  const handleOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  return (
    <div ref={pollRef} className="mt-2">
      {pollOptions.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          placeholder={index === 0 ? "Yes" : "No"}
          className="block mt-2 w-[500px] p-2 border rounded-2xl outline-none text-gray-500 dark:bg-neutral-900 dark:border-neutral-700"
        />
      ))}
      <button
        onClick={() => setPollOptions([...pollOptions, ""])}
        className="mt-2 text-gray-500"
      >
        Add another option
      </button>
    </div>
  );
}
