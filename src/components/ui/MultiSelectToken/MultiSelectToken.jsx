import { useEffect, useRef, useState } from "react";
import { ArrowDownIcon, CheckMarkIcon } from "../../../utils/icons";
import { useAddNicheMutation, useNichesQuery } from "../../../redux/api/nicheApi";

const MultiSelectToken = ({ value, onClick, readOnly = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isAddNiche,setIsAddNiche] = useState(false)
  const componentRef = useRef(null);
  const [addNiche] = useAddNicheMutation();
  const { data, isLoading } = useNichesQuery();
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
    if (!value.includes(option)) {
      onClick([...value, option]);
    }
    // setIsOpen(false);
  };

  // const handleRemoveToken = (tokenToRemove) => {
  //   onClick(value.filter((token) => token !== tokenToRemove));
  // };

  // const availableOptions = options.filter((option) => !value.includes(option));


  const onSubmit = async () => {
      try {
        await addNiche({ title: inputValue });

      } catch (err) {
        console.error(err.message);

      }
    };

  
  useEffect(() => {
    console.log(data)
  }, [isLoading, data])


  return (
    <div className="relative" ref={componentRef}>
      {/* The main component input-like area */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`realtive border border-[#B2B5B8] px-3 py-2 font-poppins text-[#171819] w-full ${
          isOpen && !readOnly ? "outline outline-[#006AC2]" : ""
        }`}
      >
        {/* Rendered Tokens */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="">
            {value?.length>0 ? <span>{value.join(", ")}</span> :<span>Ex: Health</span>}
          </div>
        </div>
        <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
      </div>

      {/* Dropdown with available options */}
      {isOpen && !readOnly && (
        <div className="absolute z-10 w-full">
          <div className="flex flex-col z-10 w-full mt-1 bg-white shadow-lg border border-[#B2B5B8]">
            {data?.niches &&
              data?.niches?.map((option, index) => (
                <label
                  key={index}
                  htmlFor={option.id}
                  className={`px-4 py-2 cursor-pointer hover:bg-slate-100 flex item-center gap-2.5 text-[#878C91] ${
                    index + 1 == 1 ? "" : "border-t border-[#B2B5B8]"
                  }`}
                  onClick={() => handleSelectOption(option.id)}
                >
                  <input type="checkbox" name={option?.id} id={option?.id} />
                  {option.title}
                </label>
              ))}
            <p
              className={`px-4 py-2 border-t border-[#B2B5B8] cursor-pointer hover:bg-slate-100 flex item-center gap-2.5 text-[#36383A] }`}
              onClick={() => setIsAddNiche(!isAddNiche)}
            >
              + Add Niche
            </p>
          </div>
          {isAddNiche && (
            <div className="p-2 w-full bg-white shadow-lg mt-2 flex items-center gap-1">
              <input
                type="text"
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                className="px-2 py-1 border border-[#36383A] outline-none w-full h-8"
              />
              <p
                onClick={() => onSubmit()}
                className=" bg-[#002747] h-8 w-8 flex items-center justify-center cursor-pointer"
              >
                <CheckMarkIcon />
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectToken;
