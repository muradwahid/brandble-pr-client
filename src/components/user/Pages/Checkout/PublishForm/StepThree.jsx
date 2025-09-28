import UploadFileField from '../../../../ui/UploadFileField/UploadFileField';

const StepThree = ({ register, errorMessage,control }) => {
  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;

  return (
    <div>
      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
        Future
      </h1>
      <div>
        <div className="flex flex-col mt-5">
          <label
            htmlFor="announcement"
            className="text-sm text-[#5F6368] mb-3"
          >
            Please list any specific announcements that are upcoming in the next
            3-12 months and the specific dates if applicable (what should you
            audience be looking forward to)?
          </label>
          <textarea
            type="text"
            id="announcement"
            {...register('announcement', { required: "Upcoming announcements are required." })}
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
          {errorMessage('announcement')}
        </div>
        <div className="flex flex-col mt-5">
          <label htmlFor="publicist" className="text-sm text-[#5F6368] mb-3">
            Is there anything else that you would like to add / that you think
            our publicist should know in order to create an effective and
            successful article?
          </label>
          <textarea
            type="text"
            id="additionalContent"
            {...register('additionalContent', { required: "Additional details required." })}
            name="additionalContent"
            rows={5}
            className={`${inputCls} resize-none`}
            placeholder="Describe here..."
          />
          {errorMessage('announcement')}
        </div>
      </div>


      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3 mt-10 mb-5">
        Upload Image
      </h1>
      <p htmlFor="personImage" className="text-sm text-[#5F6368] mb-3">
        Upload one HORIZONTAL, high-resolution, and professional photo of you/the person this PR campaign is for.
      </p>
      <UploadFileField register={register} errorMessage={errorMessage} name="personImage" requiredMessage="Please upload a clearer horizontal photo." control={control}/>

      <p htmlFor="serviceImage" className="text-sm text-[#5F6368] mb-3 mt-5">
        Upload one photo of your brand/product/service you want to highlight. (Optional)
      </p>
      <UploadFileField register={register} errorMessage={errorMessage} name="serviceImage" isOptional={true} control={control}/>
      <p htmlFor="brandLogo" className="text-sm text-[#5F6368] mb-3 mt-5">
        Upload your company or brand logo. (Optional)
      </p>
      <UploadFileField register={register} errorMessage={errorMessage} name="brandLogo" isOptional={true} control={control} />

    </div>
  );
};

export default StepThree;