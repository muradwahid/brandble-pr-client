import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAddWonArticleMutation } from '../../../../../../redux/api/wonArticleApi';
import { LoadingIcon, UploadFileIcon } from '../../../../../../utils/icons';
import { useState } from 'react';
const WonArticle = ({ setPublishPopup }) => {
  const [fileName, setFileName] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();

  const [addWonArticle, { isLoading }] = useAddWonArticleMutation();

  const onSubmit = async (d) => {
    const obj = { ...d };
    const file = obj["file"];

    const wonArticleData = { ...obj };
    delete wonArticleData["file"];
    const publicationStr = JSON.stringify(wonArticleData);
    const formData = new FormData();
    Array.from(file).forEach((f) => {
      formData.append("file", f);
    });

    formData.append("data", publicationStr);

    if (file?.length) {
      if (formData) {
        console.log(formData)
        try {
          const response = await addWonArticle(formData);
          if (response?.data?.id) {
            setPublishPopup(true)
            setFileName([])
          }
          reset()
        } catch (err) {
          console.error("Submission failed:", err);
          toast.error("Failed to submitted article");
        }

      }
    }

  };


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border border-[#DCDEDF] p-6 w-full">
          <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
            Upload your Article
          </h1>
          <p className="text-[#5F6368] text-sm font-normal mt-5">
            Upload Article
          </p>
          <label htmlFor="wonArticleFile">
            <div
              className={`flex flex-col items-center justify-center p-4 pb-5 bg-[#F6F7F7] cursor-pointer text-center transition-colors duration-200 border border-dashed border-[#DCDEDF] mt-3`}
            >
              {/* SVG Icon for image upload */}
              <div className="bg-[#F2F2F3] rounded-full p-2 mb-2.5">
                <UploadFileIcon />
              </div>
              {
                // fileName ? <p>{fileName}</p> : 
                fileName.length > 0 ? <p>{fileName.join(', ')}</p> :
                  <>
                    <p className="text-[#5F6368] text-sm font-normal mt-0.5">
                      Upload Article
                    </p>
                    <p className="text-[#B2B5B8] text-xs font-normal mt-2">
                      Max size 25mb, docx or PDF files only
                    </p>

                  </>}
              <input
                type="file"
                id="wonArticleFile"
                multiple
                {...register("file", {
                  onChange: (e) => {
                    setFileName(Array.from(e.target.files).map(file => file.name))
                  },
                  required: "Article file is required",
                  validate: (value) => {
                    const file = value[0];
                    if (file) {
                      const fileType = file.type;
                      const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                      if (!allowedTypes.includes(fileType)) {
                        return "Invalid file type. Only PDF and DOCX files are allowed.";
                      }
                      const maxSize = 25 * 1024 * 1024; // 25MB in bytes
                      if (file.size > maxSize) {
                        return "File size exceeds the limit of 25MB.";
                      }
                    }
                    return true;
                  }
                })}
                accept=".docx,.pdf"
                className="hidden"
              />

            </div>
            {errors.file && (
              <span className="text-red-400 text-xs">
                {errors.file.message}
              </span>
            )}
          </label>


          <div className="flex flex-col mt-5">
            <label
              htmlFor="message"
              className="text-sm text-[#5F6368] mb-3"
            >
              Message{" "}
              <span className="text-[#B2B5B8]">(optional)</span>
            </label>
            <textarea
              type="text"
              id="message"
              name="message"
              rows={5}
              className={`px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full resize-none`}
              placeholder="Type your message here..."
            />
          </div>
          <div className="flex justify-end mt-10">
            <button
              type='submit'
              disabled={isLoading}
              className={`bg-[#002747] text-white px-16 py-2 gap-3 cursor-pointer hover:bg-[#295d88] flex items-center justify-center transition-all duration-200 ${isLoading ? 'bg-[#295d88]' : 'bg-[#002747]'}`} >
              Submit
              {
              isLoading && 
              <LoadingIcon fill='#fff' style={{ height: "20px" }} />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WonArticle;