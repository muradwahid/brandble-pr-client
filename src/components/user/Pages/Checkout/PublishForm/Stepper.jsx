import React from "react";
import "./stepper.css";

const Stepper = ({ step, wonArticle }) => {
  return (
    <div className=" w-72 orderStepperWrapper">
      <div className="flex flex-col gap-4 orderStepperList">
        {wonArticle === "wonArticle" && (
          <>
            <div className="flex items-center gap-2 orderStepperItem">
              <p
                className={
                  "text-white text-sm font-medium bg-[#222425] h-5 w-5 flex items-center justify-center rounded-full"
                }
              >
                1
              </p>
              <p className="text-[#36383A] text-sm font-medium">
                Upload your Article
              </p>
            </div>
          </>
        )}
        {wonArticle === "writeArticle" && (
          <>
            <div className="flex items-center gap-2 orderStepperItem">
              <p
                className={
                  "text-white text-sm font-medium bg-[#222425] h-5 w-5 flex items-center justify-center rounded-full"
                }
              >
                1
              </p>
              <p className="text-[#36383A] text-sm font-medium">
                Spokesperson Information{" "}
              </p>
            </div>
            <div className="flex items-center gap-2 orderStepperItem">
              <p
                className={`text-white text-sm font-medium  h-5 w-5 flex items-center justify-center rounded-full ${
                  step >= 2 ? "bg-[#222425]" : "bg-[#878C91]"
                }`}
              >
                2
              </p>
              <p className="text-[#36383A] text-sm font-medium">Goals</p>
            </div>
            <div className="flex items-center gap-2 orderStepperItem">
              <p
                className={`text-white text-sm font-medium  h-5 w-5 flex items-center justify-center rounded-full ${
                  step >= 3 ? "bg-[#222425]" : "bg-[#878C91]"
                }`}
              >
                3
              </p>
              <p className="text-[#36383A] text-sm font-medium">Future</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Stepper;
