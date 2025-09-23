import { useEffect, useRef, useState } from "react";
import countries from "../../../assets/countries.json";
import { ArrowDownIcon } from '../../../utils/icons';

const SelectRegionData = ({
    value = {  },
    name,
    inputType = "checkbox",
    readOnly = false,
    disabled = false,
    placeholder,
    register,
    errorLabel,
    setValue,
    isNotRequired = true,
    isResetValue = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const componentRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(value);

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
        setValue(name, option?.name)
        setIsOpen(false);
    };

    useEffect(() => {
        if (isResetValue) {
            setSelectedOption({})
            console.log({ isResetValue })
        }
        console.log({ reset: isResetValue })
    }, [isResetValue])

    // const availableOptions = countries.filter((option) => !value.includes(option));
    return (
        <div className="relative" ref={componentRef}>
            <select
                value={selectedOption?.name}
                className="hidden"
                {...register(name, isNotRequired ? {
                    required: `${errorLabel} is required`,
                } : {})}
                disabled={disabled}
                readOnly={readOnly}
                onChange={(e) => handleSelectOption(e.target.value)}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {countries && countries?.map((option) => (
                    <option key={option?.name} value={option?.name}>
                        {option?.title}
                    </option>
                ))}
            </select>
            {/* The main component input-like area */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative border border-[#B2B5B8] px-3 py-2 font-poppins text-[#171819] w-full ${isOpen && !readOnly ? "outline outline-[#006AC2]" : ""
                    }`}
            >
                {/* Rendered Tokens */}
                <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm capitalize ${selectedOption?.name ? "" : "text-[#B2B5B8]"}`}>
                        {selectedOption?.name || placeholder}
                    </span>
                </div>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Dropdown with available countries */}
            {isOpen && !readOnly && (
                <div className="absolute z-10 w-full">
                    <div className="flex flex-col z-10 w-full mt-1 bg-white shadow-lg border border-[#B2B5B8] max-h-[330px] overflow-y-auto">
                        {countries && countries?.map((option, index) => (
                            <label
                                key={index}
                                htmlFor={`${name}-${option?.name}`}
                                className={`px-4 py-2 cursor-pointer hover:bg-slate-100 flex items-center gap-2.5 capitalize ${index === 0 ? "" : "border-t border-[#B2B5B8]"
                                    } ${selectedOption?.name === option?.name
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-[#878C91]"
                                    }`}
                                onClick={() => handleSelectOption(option)}
                            >
                                <input
                                    type={inputType}
                                    name={name}
                                    id={`${name}-${option?.name}`}
                                    value={option?.name}
                                    checked={selectedOption?.name === option?.name}
                                    onChange={() => { }}
                                />
                                {option?.name}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectRegionData;
