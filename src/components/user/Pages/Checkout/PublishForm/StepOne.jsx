import React from 'react';

const StepOne = () => {
    const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;
  return (
      <div>
        <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
          Spokesperson Information
        </h1>
        <div className="w-full flex justify-between">
          <div className="flex flex-col mt-4 w-[48%]">
            <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className={`${inputCls}`}
              placeholder="Enter your full name"
            />
          </div>
          <div className="flex flex-col mt-4 w-[48%]">
            <label
              htmlFor="designation"
              className="text-sm text-[#5F6368] mb-1"
            >
              Designation
            </label>
            <input
              type="text"
              id="designation"
              className={`${inputCls}`}
              placeholder="Enter your designation"
            />
          </div>
        </div>
        <div className="flex flex-col w-[48%] mt-5">
          <label htmlFor="companyName" className="text-sm text-[#5F6368] mb-1">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className={`${inputCls}`}
            placeholder="Enter your Company name"
          />
        </div>
        <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3 mt-10">
          URL and Link Share
        </h1>
        <div className="flex flex-col mt-5">
          <label htmlFor="websitelink" className="text-sm text-[#5F6368] mb-1">
            Please provide direct links to your website(s) and/or social media
            accounts (if any) that you want to be included in the articles.
          </label>
          <input
            type="text"
            id="websitelink"
            name="websitelink"
            className={`${inputCls} mt-2`}
            placeholder="Link Here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="contentink" className="text-sm text-[#5F6368] mb-1">
            Are there any existing content pieces (e.g., blog posts, articles)
            that you want our writers to reference or link to?
          </label>
          <input
            type="text"
            id="contentink"
            name="contentink"
            className={`${inputCls} mt-2`}
            placeholder="Link Here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label
            htmlFor="additionallink"
            className="text-sm text-[#5F6368] mb-1"
          >
            Please provide direct links to your website(s) and/or social media
            accounts (if any) that you want to be included in the articles.
          </label>
          <input
            type="text"
            id="additionallink"
            name="additionallink"
            className={`${inputCls} mt-2`}
            placeholder="Link Here..."
          />
        </div>
      </div>
  );
};

export default StepOne;