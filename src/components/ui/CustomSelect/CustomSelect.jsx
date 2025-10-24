import { useState, useEffect, useRef } from "react";

// CustomSelect Component
const CustomSelect = ({
  name,
  options,
  placeholder = "Select an option",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const selectRef = useRef(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative font-sans w-full max-w-xs" ref={selectRef}>
      {/* Hidden native select for form submission */}
      <select
        name={name}
        value={selectedValue}
        className="hidden"
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom select box */}
      <div
        className={`bg-white border-b-2 border-gray-900 text-gray-800 p-4 flex justify-between items-center transition-colors ${
          disabled
            ? "bg-gray-200 cursor-not-allowed opacity-70"
            : "cursor-pointer"
        }`}
        onClick={handleToggle}
      >
        <span className={selectedValue ? "text-gray-800" : "text-gray-500"}>
          {selectedValue
            ? options.find((o) => o.value === selectedValue)?.label
            : placeholder}
        </span>
        <ArrowDownIcon
          className={`w-5 h-5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-t-0 border-gray-200 shadow-lg z-10">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                className={`p-4 cursor-pointer text-gray-800 ${
                  selectedValue === option.value
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;