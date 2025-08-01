import React, { useState } from "react";
import { LeftArrowIcon, UploadFileIcon } from "../../../../../utils/icons";
import Footer from "../../../../ui/Footer/Footer";
import TopNavBar from "../../../TopNavBar/TopNavBar";
import PublishPopup from "./PublishPopup";
import StepOne from "./StepOne";
import Stepper from "./Stepper";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";

const OrderSubmitForm = () => {
  const [wonArticle, setWonArticle] = useState("wonArticle");
  const [step, setStep] = useState(1);
  const [publishPopup, setPublishPopup] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      {/* header */}
      <TopNavBar />

      {/* main */}
      <main className="flex-1 flex my-10">
        <div className="flex xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto gap-6">
          <div className="w-full">
            <button
              className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer -mt-4"
              onClick={() => window.navigation.back()}
            >
              <LeftArrowIcon />
              Back
            </button>
            <div className="flex gap-10 mt-10">
              {/* steper */}
              <Stepper step={step} wonArticle={wonArticle} />
              {/* form */}
              <div className="w-full max-w-[850px] mx-auto">
                <form className="w-full">
                  {step <= 1 && (
                    <div className="steperform-publish-formshadow border border-[#DCDEDF] mb-14 p-6">
                      <div className="flex gap-6 w-full">
                        <label
                          onClick={() => setWonArticle("wonArticle")}
                          htmlFor="wonArticle"
                          className={`flex flex-1 items-start gap-2 cursor-pointer border border-[#DCDEDF] p-4 ${
                            wonArticle === "wonArticle"
                              ? "bg-[#222425]"
                              : "bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="wonArticle"
                            id="wonArticle"
                            checked={wonArticle === "wonArticle"}
                            className={`h-4.5 w-4.5 ${
                              wonArticle === "wonArticle"
                                ? "accent-[#ffffff]"
                                : ""
                            }`}
                          />
                          <div>
                            <p
                              className={` ${
                                wonArticle === "wonArticle"
                                  ? "text-[#dfdfdf]"
                                  : "text-[#222425]"
                              } font-glare mb-1.5`}
                            >
                              Publish My Own Article
                            </p>
                            <p
                              className={`${
                                wonArticle === "wonArticle"
                                  ? "text-[#dfdfdf]"
                                  : "text-[#222425]"
                              } text-xs w-3/5`}
                            >
                              Let us write your article & publish it to your
                              desired publication
                            </p>
                          </div>
                        </label>
                        <label
                          onClick={() => setWonArticle("writeArticle")}
                          htmlFor="writeArticle"
                          className={`flex items-start flex-1 gap-2 cursor-pointer border border-[#DCDEDF] p-4 ${
                            wonArticle === "writeArticle"
                              ? "bg-[#222425]"
                              : "bg-white"
                          }`}
                        >
                          <input
                            type="radio"
                            name="writeArticle"
                            id="writeArticle"
                            checked={wonArticle === "writeArticle"}
                            className={`h-4.5 w-4.5 ${
                              wonArticle === "writeArticle"
                                ? "accent-[#ffffff]"
                                : ""
                            }`}
                          />
                          <div>
                            <p
                              className={` ${
                                wonArticle === "writeArticle"
                                  ? "text-[#dfdfdf]"
                                  : "text-[#222425]"
                              } font-glare mb-1.5`}
                            >
                              Write & Publish Article For Me
                            </p>
                            <p
                              className={`${
                                wonArticle === "writeArticle"
                                  ? "text-[#dfdfdf]"
                                  : "text-[#222425]"
                              } text-xs w-3/5`}
                            >
                              Let us write your article & publish it to your
                              desired publication
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* form section */}
                  {wonArticle === "writeArticle" && (
                    <div className=" border border-[#DCDEDF] p-6 w-full">
                      {step === 1 && <StepOne />}
                      {step === 2 && <StepTwo />}
                      {step === 3 && <StepThree />}

                      <div className="flex justify-end mt-10">
                        <div className="flex gap-4">
                          {step > 1 && (
                            <p
                              onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                                setStep((prev) => prev - 1);
                              }}
                              className="bg-white text-[#002747] px-16 py-2 border-2 border-[#002747] cursor-pointer hover:bg-[#002747] hover:text-white flex items-center justify-center transition-all duration-200"
                            >
                              Back
                            </p>
                          )}
                          {step < 3 && (
                            <p
                              onClick={() => {
                                window.scrollTo({
                                  top: 0,
                                  behavior: "smooth",
                                });
                                setStep((prev) => prev + 1);
                              }}
                              className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200"
                            >
                              Next
                            </p>
                          )}
                          {step === 3 && (
                            <p
                              onClick={() => setPublishPopup(true)}
                              className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200"
                            >
                              Submit
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {wonArticle === "wonArticle" && (
                    <div className="border border-[#DCDEDF] p-6 w-full">
                      <h1 className="text-[#222425] text-[20px] font-glare border-b border-[#DCDEDF] pb-3">
                        Upload your Article
                      </h1>
                      <p className="text-[#5F6368] text-sm font-normal mt-5">
                        Upload Article *
                      </p>
                      <div
                        className={`flex flex-col items-center justify-center p-4 pb-5 bg-[#F6F7F7] cursor-pointer text-center transition-colors duration-200 border border-dashed border-[#DCDEDF] mt-3`}
                      >
                        {/* SVG Icon for image upload */}
                        <div className="bg-[#F2F2F3] rounded-full p-2 mb-2.5">
                          <UploadFileIcon />
                        </div>

                        <p className="text-[#5F6368] text-sm font-normal mt-0.5">
                          Upload Article
                        </p>
                        <p className="text-[#B2B5B8] text-xs font-normal mt-2">
                          Max size 25mb, docx or PDF files only
                        </p>
                        <input
                          type="file"
                          id="uploadArticle"
                          multiple
                          name="uploadArticle"
                          accept=".docx,.pdf"
                          className="hidden"
                        />
                      </div>

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
                        <p
                          onClick={() => setPublishPopup(true)}
                          className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200"
                        >
                          Submit
                        </p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      {publishPopup && <PublishPopup setPublishPopup={setPublishPopup} />}
      <Footer />
    </div>
  );
};

export default OrderSubmitForm;
