import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import { useForm } from 'react-hook-form';
import { useUserQuery } from "../../../../../../redux/api/authApi"

const WriteArticle = ({ step, setStep, setPublishPopup }) => {
    const id = "5cdd3e2e-eec2-4aaf-9e8b-0d8fb3d94ffd"
    const { data, isLoading } = useUserQuery(id);

  const {
    register,
    handleSubmit,
    formState: { errors }, reset,control,watch,trigger
  } = useForm({defaultValues:{
    fullName:'',
    designation:'',
    company:'',
    socialMediaLink:'',
    blockContentLink:'',
    additionalLink:'',
    mainGoal:'',
    mainTheme:'',
    points:'',
    audience:'',
    wishList:'',
    announcement:'',
    additionalContent:'',
    personImage:'',
    serviceImage:'',
    brandLogo:'',
  }});
  const stepOneFields= ["fullName","designation","company","socialMediaLink","blockContentLink","additionalLink"];
    const stepTwoFields = ["mainGoal", "mainTheme", "points", "audience", "wishList"]
      const stepThreeFields= ['announcement','additionalContent','personImage']
  const formData = watch();
 const handleNextStep = async () => {
  let fieldsToValidate = [];
  
  switch (step) {
    case 1:
      fieldsToValidate = stepOneFields;
      break;
    case 2:
      fieldsToValidate = stepTwoFields;
      break;
    case 3:
      fieldsToValidate = stepThreeFields;
      break;
    default:
      fieldsToValidate = [];
  }

  // Validate FIRST, then check if valid
  const isValid = await trigger(fieldsToValidate);
  
  // Only increment step if validation passes AND we're not on the last step
  if (isValid && step < 3) {
    setStep(step + 1);
  }
  // If validation fails, the errors will automatically show via react-hook-form
};


  const onSubmit = async (d) => {
    console.log(d)
  }

  const errorMessage = (name) => errors?.[name] && <span className="text-red-400 text-xs mt-0.5">
    {errors?.[name].message}
  </span>

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className=" border border-[#DCDEDF] p-6 w-full">
          {step === 1 && <StepOne {...{ register, errorMessage,data,isLoading }} />}
          {step === 2 && <StepTwo {...{ register, errorMessage }} />}
          {step === 3 && <StepThree {...{ register, errorMessage,control }} />}

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
                    handleNextStep()
                  }}
                  className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200"
                >
                  Next
                </p>
              )}
              {step === 3 && (
                <button
                  type='submit'
                  // onClick={() => setPublishPopup(true)}
                  className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteArticle;