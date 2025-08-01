import React from 'react';

const StepTwo = () => {
      const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;
  return (
    <div className='w-full'>
      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
        Goals
      </h1>
      <div>
        <div className="flex flex-col mt-5">
          <label htmlFor="prCampaign" className="text-sm text-[#5F6368] mb-3">
            What is the main goal of this PR campaign?
          </label>
          <textarea
            type="text"
            id="prCampaign"
            name="prCampaign"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe your goals here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="message" className="text-sm text-[#5F6368] mb-3">
            What is the main message or theme that you want?
          </label>
          <textarea
            type="text"
            id="message"
            name="message"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="information" className="text-sm text-[#5F6368] mb-3">
            What specific points or information do you want to include??
          </label>
          <textarea
            type="text"
            id="information"
            name="information"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe the points here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label
            htmlFor="audience"
            className="text-sm text-[#5F6368] mb-3"
          >
            Who is the target audience?
          </label>
          <textarea
            type="text"
            id="audience"
            name="audience"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe the points here..."
          />
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="headline" className="text-sm text-[#5F6368] mb-3">
            If you'd like, provides a few "wish list" headlines ideas we can share with the editor.
          </label>
          <textarea
            type="text"
            id="headline"
            name="headline"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe headline here..."
          />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;