import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, CheckMarkIcon, LoadingIcon } from "../../../utils/icons";

const SelectControl = ({
  options,
  value = {id:""},
  name,
  inputType = "checkbox",
  label = "Niche",
  readOnly = false,
  disabled = false,
  placeholder,
  register,
  errorLabel,
  setValue,
  isLoading,
  onAddOption = () => { },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddValue, setIsAddValue] = useState(false);
  const componentRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState(value);
  const [isInput, setIsInput] = useState(true);
  const [input, setInput] = useState("");

  // const { data } = useQuery(selectedOption?.id);

  // Effect to handle clicks outside the component to close the dropdown
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

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setValue(name,option?.id)
    setIsOpen(false);
  };

  // const availableOptions = options.filter((option) => !value.includes(option));
  return (
    <div className="relative" ref={componentRef}>
      <select
        value={selectedOption?.id}
        className="hidden"
        {...register(name, {
          required: `${errorLabel} is required`,
        })}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => handleSelectOption(e.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option?.id} value={option?.id}>
            {option?.title}
          </option>
        ))}
      </select>
      {/* The main component input-like area */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`relative border border-[#B2B5B8] px-3 py-2 font-poppins text-[#171819] w-full ${
          isOpen && !readOnly ? "outline outline-[#006AC2]" : ""
        }`}
      >
        {/* Rendered Tokens */}
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-sm capitalize ${selectedOption?.id ? "" : "text-[#B2B5B8]"}`}>
            {selectedOption?.title || placeholder}
          </span>
        </div>
        <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Dropdown with available options */}
      {isOpen && !readOnly && (
        <div className="absolute z-10 w-full">
          <div className="flex flex-col z-10 w-full mt-1 bg-white shadow-lg border border-[#B2B5B8] max-h-[330px] overflow-y-auto">
            {options.map((option, index) => (
              <label
                key={index}
                htmlFor={`${name}-${option?.id}`}
                className={`px-4 py-2 cursor-pointer hover:bg-slate-100 flex items-center gap-2.5 capitalize ${
                  index === 0 ? "" : "border-t border-[#B2B5B8]"
                } ${
                  selectedOption?.id === option?.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-[#878C91]"
                }`}
                onClick={() => handleSelectOption(option)}
              >
                <input
                  type={inputType}
                  name={name}
                  id={`${name}-${option?.id}`}
                  value={option?.id}
                  checked={selectedOption?.id === option?.id}
                  onChange={() => {}}
                />
                {option?.title}
              </label>
            ))}

            <p
              className={`px-4 py-2 border-t border-[#B2B5B8] cursor-pointer hover:bg-slate-100 flex item-center gap-2.5 text-[#36383A] }`}
              onClick={() => setIsAddValue(!isAddValue)}
            >
              + Add {label}
            </p>
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
                      onAddOption(input);
                      setInput("");
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

export default SelectControl;
