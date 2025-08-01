import React, { useState } from 'react';
import FileUploadArea from './FileUploadArea';
import FileListDisplay from './FileListDisplay';

const FileUploadField = () => {
    const MAX_FILES_PER_FIELD = 2;
    const MAX_FILE_SIZE_BYTES = 1 * 1024 * 1024; // 1MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png"];

    // State for three file fields
    const [fileFields, setFileFields] = useState([
      { id: 1, files: [], errorMessage: "",name:"prCampaignImages" },
      { id: 2, files: [], errorMessage: "",name:"wishlist" },
      { id: 3, files: [], errorMessage: "",name:"wishlist" },
    ]);

    // Function to validate a single file and return specific errors
    const getFileValidationErrors = (file) => {
      let errors = [];
      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`File "${file.name}" is not a JPG, JPEG, or PNG image.`);
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`File "${file.name}" exceeds the maximum size of 1MB.`);
      }
      return errors;
    };

    // Function to validate files for a specific field and update its error message
    const validateFiles = (fieldIndex, filesToValidate) => {
      let currentErrorMessage = "";

      if (filesToValidate.length > MAX_FILES_PER_FIELD) {
        currentErrorMessage = `Error: You can upload a maximum of ${MAX_FILES_PER_FIELD} files for this field.`;
      } else {
        for (const file of filesToValidate) {
          const errors = getFileValidationErrors(file);
          if (errors.length > 0) {
            currentErrorMessage = errors.join(" "); // Combine errors for this file
            break; // Stop on first invalid file
          }
        }
      }

      setFileFields((prevFields) =>
        prevFields.map((field, index) =>
          index === fieldIndex
            ? { ...field, errorMessage: currentErrorMessage }
            : field
        )
      );
    };

    // Handle file selection (from click or drop) for a specific field
    const handleFileSelection = (fieldIndex, newFiles) => {
      setFileFields((prevFields) => {
        const updatedFields = [...prevFields];
        const currentField = updatedFields[fieldIndex];

        const newFilesArray = Array.from(newFiles);
        let specificFileErrors = []; // Collect errors for newly selected files

        // Filter out files that are not allowed types OR too large
        const validNewFilesToAdd = newFilesArray.filter((file) => {
          const errors = getFileValidationErrors(file);
          if (errors.length > 0) {
            specificFileErrors.push(...errors);
            return false; // This file is not valid to add
          }
          return true; // This file is valid
        });

        // Combine existing files with the newly valid ones that can be added
        let updatedFilesForField = [
          ...currentField.files,
          ...validNewFilesToAdd,
        ];

        let fieldErrorMessage = "";

        // Check overall limit for the field
        if (updatedFilesForField.length > MAX_FILES_PER_FIELD) {
          // If we've exceeded the limit, truncate and set an error
          updatedFilesForField = updatedFilesForField.slice(
            0,
            MAX_FILES_PER_FIELD
          );
          fieldErrorMessage = `Error: You can upload a maximum of ${MAX_FILES_PER_FIELD} files for this field. Only the first ${MAX_FILES_PER_FIELD} files will be considered.`;
        }

        // Combine specific file errors with the field limit error
        if (specificFileErrors.length > 0) {
          fieldErrorMessage =
            specificFileErrors.join(" ") +
            (fieldErrorMessage ? " " + fieldErrorMessage : "");
        }

        updatedFields[fieldIndex].files = updatedFilesForField;
        updatedFields[fieldIndex].errorMessage = fieldErrorMessage; // Set the error message directly here

        return updatedFields;
      });
    };

    // Function to remove a file from a specific field
    const handleRemoveFile = (fieldIndex, fileIndexToRemove) => {
      setFileFields((prevFields) => {
        const updatedFields = [...prevFields];
        const currentField = updatedFields[fieldIndex];

        const updatedFilesForField = currentField.files.filter(
          (_, index) => index !== fileIndexToRemove
        );
        updatedFields[fieldIndex].files = updatedFilesForField;
        validateFiles(fieldIndex, updatedFilesForField); // Re-validate after removal to clear or update errors

        return updatedFields;
      });
    };
  return (
    <div className="space-y-5">
      {fileFields.map((field, index) => (
        <div key={field.id} className="w-full">
          <label htmlFor="headline" className="text-sm text-[#5F6368] mb-3">
            If you'd like, provides a few "wish list" headlines ideas we can
            share with the editor.
          </label>
          <FileUploadArea
            onFileSelect={handleFileSelection}
            fieldIndex={index}
          />
          <FileListDisplay
            files={field.files}
            onRemoveFile={handleRemoveFile}
            fieldIndex={index}
          />
          {field.errorMessage && (
            <div className="text-red-500 text-sm mt-2">
              {field.errorMessage}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileUploadField;
