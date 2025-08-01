// FileListDisplay Component
const FileListDisplay = ({ files, onRemoveFile, fieldIndex }) => {
  if (files.length === 0) return null;

  // Helper function to format file size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="mt-4">
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-50 p-2 rounded-md mt-2 text-sm text-gray-700"
        >
          <span className="flex-grow mr-2 break-all">{file.name}</span>
          <span className="text-gray-500 text-xs">
            {formatBytes(file.size)}
          </span>
          <button
            type="button"
            className="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
            onClick={() => onRemoveFile(fieldIndex, index)}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
};

export default FileListDisplay;