import React, { useState } from "react";
import { LeftArrowIcon, UploadFileIcon } from "../../../../../utils/icons";
import Footer from "../../../../ui/Footer/Footer";
import TopNavBar from "../../../TopNavBar/TopNavBar";
import PublishPopup from "./PublishPopup";
import StepOne from "./StepOne";
import Stepper from "./Stepper";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
import WonArticle from './WonArticle/WonArticle';
import WriteArticle from './WriteArticle/WriteArticle';


const OrderSubmitForm = () => {
  const [wonArticle, setWonArticle] = useState("writeArticle");
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
                {step <= 1 && (
                  <div className="steperform-publish-formshadow border border-[#DCDEDF] mb-14 p-6">
                    <div className="flex gap-6 w-full">
                      <label
                        onClick={() => setWonArticle("wonArticle")}
                        htmlFor="wonArticle"
                        className={`flex flex-1 items-start gap-2 cursor-pointer border border-[#DCDEDF] p-4 ${wonArticle === "wonArticle"
                          ? "bg-[#222425]"
                          : "bg-white"
                          }`}
                      >
                        <input
                          type="radio"
                          name="wonArticle"
                          id="wonArticle"
                          checked={wonArticle === "wonArticle"}
                          className={`h-4.5 w-4.5 ${wonArticle === "wonArticle"
                            ? "accent-[#ffffff]"
                            : ""
                            }`}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setWonArticle("wonArticle");
                            }
                          }}
                        />
                        <div>
                          <p
                            className={` ${wonArticle === "wonArticle"
                              ? "text-[#dfdfdf]"
                              : "text-[#222425]"
                              } font-glare mb-1.5`}
                          >
                            Publish My Own Article
                          </p>
                          <p
                            className={`${wonArticle === "wonArticle"
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
                        className={`flex items-start flex-1 gap-2 cursor-pointer border border-[#DCDEDF] p-4 ${wonArticle === "writeArticle"
                          ? "bg-[#222425]"
                          : "bg-white"
                          }`}
                      >
                        <input
                          type="radio"
                          name="writeArticle"
                          id="writeArticle"
                          checked={wonArticle === "writeArticle"}
                          className={`h-4.5 w-4.5 ${wonArticle === "writeArticle"
                            ? "accent-[#ffffff]"
                            : ""
                            }`}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setWonArticle("writeArticle");
                            }
                          }}
                        />
                        <div>
                          <p
                            className={` ${wonArticle === "writeArticle"
                              ? "text-[#dfdfdf]"
                              : "text-[#222425]"
                              } font-glare mb-1.5`}
                          >
                            Write & Publish Article For Me
                          </p>
                          <p
                            className={`${wonArticle === "writeArticle"
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
                {/* Won Article */}
                {wonArticle === "wonArticle" && <WonArticle setPublishPopup={setPublishPopup} />}
                {/* Write Article */}
                {wonArticle === "writeArticle" && <WriteArticle {...{ step, setStep, setPublishPopup }} />}
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
