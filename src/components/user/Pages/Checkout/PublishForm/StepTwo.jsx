import React from 'react';

const StepTwo = ({ register, errorMessage }) => {
  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;



  return (
    <div className='w-full'>
      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
        Goals
      </h1>
      <div>
        <div className="flex flex-col mt-5">
          <label htmlFor="mainGoal" className="text-sm text-[#5F6368] mb-3">
            What is the main goal of this PR campaign?
          </label>
          <textarea
            type="text"
            id="mainGoal"
            {...register("mainGoal", {
              required: "PR campaign is required. Please enter the campaign objective.",
            })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe your goals here..."
          />
          {errorMessage('mainGoal')}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="mainTheme" className="text-sm text-[#5F6368] mb-3">
            What is the main message or theme that you want?
          </label>
          <textarea
            type="text"
            id="mainTheme"
            {...register("mainTheme", {
              required: "Main message or theme is required.",
            })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
          {errorMessage('mainTheme')}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="points" className="text-sm text-[#5F6368] mb-3">
            What specific points or information do you want to include??
          </label>
          <textarea
            type="text"
            id="points"
            {...register("points", {
              required: "Please enter the specific points or information you want included.",
            })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe the points here..."
          />
          {errorMessage('points')}
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
            {...register("audience", {
              required: "Target audience is required.",
            })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe the points here..."
          />
          {errorMessage('audience')}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="wishList" className="text-sm text-[#5F6368] mb-3">
            If you'd like, provides a few "wish list" headlines ideas we can share with the editor.
          </label>
          <textarea
            type="text"
            id="wishList"
            name="wishList"
            {...register("wishList", {
              required: '"Wish list" Headlines ideas.',
            })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe headline here..."
          />
          {errorMessage('wishList')}
        </div>
      </div>
    </div>
  );
};

export default StepTwo;