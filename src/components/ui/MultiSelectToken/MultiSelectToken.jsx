import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, CheckMarkIcon, LoadingIcon } from "../../../utils/icons";

const MultiSelectToken = ({
  value = [],
  onChange,
  name,
  readOnly = false,
  options = [],
  placeholder = "Select options",
  label = "Niche",
  isLoading = false,
  onAddNiche = () => { },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddValue, setIsAddValue] = useState(false);
  const [isInput, setIsInput] = useState(true);
  const componentRef = useRef(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelectOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];

    onChange(newValue);
  };

  const getSelectedLabels = () => {
    return value.map((val) => {
      const option = options?.find((o) => o.id === val);
      return option ? option.title : val;
    });
  };

  return (
    <div className="relative" ref={componentRef}>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />

      {/* The main component input-like area */}
      <div
        onClick={handleToggle}
        className={`relative border border-[#B2B5B8] px-3 py-2 font-poppins text-[#171819] w-full ${
          isOpen && !readOnly ? "outline outline-[#006AC2]" : ""
        } ${readOnly ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"}`}
      >
        {/* Rendered Tokens */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm">
            {getSelectedLabels().length > 0 ? (
              <span>{getSelectedLabels().join(", ")}</span>
            ) : (
              <span className="text-[#B2B5B8]">{placeholder}</span>
            )}
          </div>
        </div>
        <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Dropdown with available options */}
      {isOpen && !readOnly && (
        <div className="absolute z-10 w-full mt-0.5">
          <div className=" bg-white shadow-lg border border-[#B2B5B8] ">
            <div className="flex flex-col">
              {options &&
                options?.map((option, index) => (
                  <label
                    key={option.id}
                    htmlFor={`${name}-${option.id}`}
                    className={`px-4 py-2 text-[#878C91] cursor-pointer hover:bg-slate-100 flex items-center gap-2.5 ${
                      index === 0 ? "" : "border-t border-[#B2B5B8]"
                    } ${
                      value.includes(option.id)
                        ? "bg-blue-50 text-blue-600"
                        : "text-[#878C91]"
                    }`}
                    onClick={() => handleSelectOption(option.id)}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option.id)}
                      onChange={() => {}}
                      // className="hidden"
                    />
                    {option.title}
                  </label>
                ))}

              <p
                className={`px-4 py-2 border-t border-[#B2B5B8] cursor-pointer hover:bg-slate-100 flex item-center gap-2.5 text-[#36383A] }`}
                onClick={() => setIsAddValue(!isAddValue)}
              >
                + Add {label}
              </p>
            </div>
          </div>

          {isAddValue && (
            <div className="p-2 w-full bg-white shadow-lg mt-2">
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  onChange={(e) => {
                    setInput(e.target.value);
                    setIsInput(true);
                  }}
                  value={input}
                  className="px-2 py-1 border border-[#36383A] outline-none w-full h-8"
                />
                <p
                  onClick={() => {
                    if (!input) {
                      setIsInput(false);
                    } else {
                      onAddNiche(input);
                      setInput('')
                    }
                  }}
                  className=" bg-[#002747] h-8 w-8 flex items-center justify-center cursor-pointer"
                >
                  {isLoading ? <LoadingIcon fill='#fff' style={{height:"20px"}} /> :<CheckMarkIcon />}
                </p>
              </div>
              {!isInput && (
                <span className="text-red-400 text-xs">{label} is empty!</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default MultiSelectToken;