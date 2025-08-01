import { useRef } from "react";
import { ImagesIcon } from "../../../../../../utils/icons";

// FileUploadArea Component
const FileUploadArea = ({ onFileSelect, fieldIndex,fieldName }) => {
  const fileInputRef = useRef(null);
  // const [isDragOver, setIsDragOver] = useState(false);

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setIsDragOver(true);
  // };

  // const handleDragLeave = () => {
  //   setIsDragOver(false);
  // };

  const handleDrop = (e) => {
    e.preventDefault();
    // setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(fieldIndex, e.dataTransfer.files);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(fieldIndex, e.target.files);
    }
    // Clear the input value to allow re-uploading the same file if needed
    e.target.value = "";
  };

  return (
    <div
      id={`uploadArea-${fieldIndex}`}
      className={`flex flex-col items-center justify-center p-8 bg-[#F6F7F7] cursor-pointer text-center transition-colors duration-200 border border-dashed border-[#DCDEDF] rounded-2xl`}
      onClick={handleClick}
      // onDragOver={handleDragOver}
      // onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* SVG Icon for image upload */}
      <ImagesIcon />
      <p className="text-[#0EA5E9] text-xs font-medium mt-2.5">
        Click to upload{" "}
        <span className="text-[#4A4C56] text-xs font-medium">
          or drag and drop
        </span>
      </p>
      <p className="text-[#A5A5AB] text-xs font-normal mt-0.5">
        Upload max 2 JPG, JPEG, PNG images less than 1MB each
      </p>
      <input
        type="file"
        id={fieldName}
        multiple
        name={fieldName}
        accept=".jpg,.jpeg,.png"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};
export default FileUploadArea;
