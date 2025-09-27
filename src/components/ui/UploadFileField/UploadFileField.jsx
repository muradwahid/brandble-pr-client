import { useEffect, useRef, useState } from 'react';
import { ImagesIcon } from '../../../utils/icons';
import { useController } from 'react-hook-form';

const UploadFileField = ({ control, name, mimeType = "image/*", reset, isOptional = false, requiredMessage = '' }) => {
    const [image, setImage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const { field, fieldState } = useController({
        name,
        control,
        rules: {
            required: !isOptional ? requiredMessage : false,
        },
    });

    useEffect(() => {
        if (reset) {
            setImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            field.onChange(null);
        }
    }, [reset, field]);

    useEffect(() => {
        if (reset) {
            setImage('');
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }, [reset]);

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging) {
            setIsDragging(true);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    const handleFiles = (files) => {
        const fileArray = Array.from(files);

        if (fileArray.length > 0) {
            const file = fileArray[0];

            const isValidType = mimeType === "image/*"
                ? file.type.startsWith('image/')
                : file.type === mimeType;

            const isValidSize = file.size < 1024 * 1024;

            if (isValidType && isValidSize) {
                setImage(file.name);
                field.onChange(file); // This sets the file in react-hook-form

                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);

                if (fileInputRef.current) {
                    fileInputRef.current.files = dataTransfer.files;
                }
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const isValidType = mimeType === "image/*"
                ? file.type.startsWith('image/')
                : file.type === mimeType;

            const isValidSize = file.size < 1024 * 1024;

            if (isValidType && isValidSize) {
                setImage(file.name);
                field.onChange(file); // This sets the file in react-hook-form
            } else {
                e.target.value = '';
                setImage('');
                field.onChange(null);
            }
        } else {
            setImage('');
            field.onChange(null);
        }
    };

    // Fixed: Remove the !image condition to allow replacing existing image
    const handleUploadAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const uploadAreaClasses = `flex flex-col items-center justify-center p-8 bg-[#F6F7F7] cursor-pointer text-center transition-colors duration-200 border border-dashed rounded-2xl ${isDragging
        ? 'border-[#0EA5E9] bg-[#E0F2FE]'
        : 'border-[#DCDEDF]'
        }`;

    return (
        <div>
            <div
                id={`uploadArea`}
                className={uploadAreaClasses}
                onClick={handleUploadAreaClick}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {
                    image ? (
                        <div className="text-center">
                            <p className='my-5'>{image}</p>
                            <p className="text-[#0EA5E9] text-xs font-medium">
                                Click to replace image
                            </p>
                        </div>
                    ) : (
                        <>
                            <ImagesIcon />
                            <p className="text-[#0EA5E9] text-xs font-medium mt-2.5">
                                Click to upload <span className="text-[#4A4C56] text-xs font-medium"> or drag and drop </span>
                            </p>
                            <p className="text-[#A5A5AB] text-xs font-normal mt-0.5">
                                Upload a JPG, JPEG, or PNG image less than 1MB
                            </p>
                            {isDragging && (
                                <p className="text-[#0EA5E9] text-xs font-medium mt-2">
                                    Drop image here...
                                </p>
                            )}
                        </>
                    )
                }
                <input
                    type="file"
                    multiple={false}
                    onChange={handleFileChange}
                    ref={(e) => {
                        fileInputRef.current = e;
                        field.ref(e);
                    }}
                    id={name}
                    accept={mimeType}
                    className="hidden"
                />
            </div>
            {fieldState.error && (
                <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
            )}
        </div>
    );
};

export default UploadFileField;