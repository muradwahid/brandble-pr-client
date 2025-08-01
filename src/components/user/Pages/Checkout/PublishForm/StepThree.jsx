import React from 'react';
import FileUploadField from './FileUploadField/FileUploadField';

const StepThree = () => {
  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;
  return (
    <div>
      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
        Future
      </h1>
      <div>
        <div className="flex flex-col mt-5">
          <label
            htmlFor="announcements"
            className="text-sm text-[#5F6368] mb-3"
          >
            Please list any specific announcements that are upcoming in the next
            3-12 months and the specific dates if applicable (what should you
            audience be looking forward to)?
          </label>
          <textarea
            type="text"
            id="announcements"
            name="announcements"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="publicist" className="text-sm text-[#5F6368] mb-3">
            Is there anything else that you would like to add / that you think
            our publicist should know in order to create an effective and
            successful article?
          </label>
          <textarea
            type="text"
            id="publicist"
            name="publicist"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
        </div>
      </div>

      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3 mt-10 mb-5">
        Upload Image
      </h1>
      <FileUploadField />
    </div>
  );
};

export default StepThree;