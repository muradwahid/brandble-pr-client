import { useEffect, useState } from 'react';


const StepOne = ({ register,errorMessage,isLoading,data }) => {


  const [userData, setUserData] = useState({})

  useEffect(() => {
    setUserData(data)
  }, [data, isLoading])

  if (isLoading) return



  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;
  return (
    <div>
      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
        Spokesperson Information
      </h1>
      {<div className="w-full flex justify-between">
        <div className="flex flex-col mt-4 w-[48%]">
          <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
            Full Name
          </label>
          <input
            {...register("fullName", {
              required: "Full name is required.",
            })}
            type="text"
            id="fullName"
            className={`${inputCls}`}
            key={data?.name}
            placeholder="Enter your full name"
            defaultValue={userData?.name}
          />
          {errorMessage('fullName')}
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
            {...register("designation", {
              required: "Designation is required.",
            })}
            className={`${inputCls}`}
            placeholder="Enter your designation"
            key={data?.designation}
            defaultValue={data?.designation}
          />
          {errorMessage('designation')}
        </div>
      </div>}
      <div className="flex flex-col w-[48%] mt-5">
        <label htmlFor="companyName" className="text-sm text-[#5F6368] mb-1">
          Company Name
        </label>
        <input
          type="text"
          id="companyName"
          {...register("company", {
            required: "Company name is required.",
          })}
          className={`${inputCls}`}
          placeholder="Enter your Company name"
          key={userData?.company}
          defaultValue={userData?.company}
        />
        {errorMessage('company')}
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
          id="socialMediaLink"
          name="socialMediaLink"
          {...register("socialMediaLink", {
            required: "website(s) and/or social media address is required.",
          })}
          className={`${inputCls} mt-2`}
          placeholder="Link Here..."
        />
        {errorMessage('socialMediaLink')}
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="blockContentLink" className="text-sm text-[#5F6368] mb-1">
          Are there any existing content pieces (e.g., blog posts, articles)
          that you want our writers to reference or link to?
        </label>
        <input
          type="text"
          id="blockContentLink"
          {...register("blockContentLink", {
            required: "Blog posts, Articles address is required.",
          })}
          className={`${inputCls} mt-2`}
          placeholder="Link Here..."
        />
        {errorMessage('blockContentLink')}
      </div>
      <div className="flex flex-col mt-5">
        <label
          htmlFor="additionalLink"
          className="text-sm text-[#5F6368] mb-1"
        >
          Please provide direct links to your website(s) and/or social media
          accounts (if any) that you want to be included in the articles.
        </label>
        <input
          type="text"
          id="additionalLink"
          {...register("additionalLink", {
            required: "Blog posts, Articles address is required.",
          })}
          className={`${inputCls} mt-2`}
          placeholder="Link Here..."
        />
        {errorMessage('additionalLink')}
      </div>
    </div>
  );
};

export default StepOne;