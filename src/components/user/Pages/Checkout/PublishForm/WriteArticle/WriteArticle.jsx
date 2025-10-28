import StepOne from '../StepOne';
import StepTwo from '../StepTwo';
import StepThree from '../StepThree';
import { useForm } from 'react-hook-form';
import { useUserQuery } from "../../../../../../redux/api/authApi"
import toast from 'react-hot-toast';
import { useAddWriteArticleMutation } from '../../../../../../redux/api/writeArticleApi';
import { LoadingIcon } from '../../../../../../utils/icons';
import { useUpdateOrderMutation } from '../../../../../../redux/api/orderApi';
import { getUserInfo } from '../../../../../../helpers/user/user';
import { useParams } from 'react-router';

const WriteArticle = ({ step, setStep, setPublishPopup }) => {
  const user = getUserInfo()
  const {id} = useParams()
  const { data, isLoading } = useUserQuery(user?.id);

    const [updateOrder] = useUpdateOrderMutation()

  const [addWriteArticle, { isLoading: addWriteArticleLoading, error }] = useAddWriteArticleMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }, reset, control,  trigger
  } = useForm({
    defaultValues: {
      fullName: '',
      designation: '',
      company: '',
      socialMediaLink: '',
      blockContentLink: '',
      additionalLink: '',
      mainGoal: '',
      mainTheme: '',
      points: '',
      audience: '',
      wishList: '',
      announcement: '',
      additionalContent: '',
      personImage: '',
      serviceImage: '',
      brandLogo: '',
    }
  });
  const stepOneFields = ["fullName", "designation", "company", "socialMediaLink", "blockContentLink", "additionalLink"];
  const stepTwoFields = ["mainGoal", "mainTheme", "points", "audience", "wishList"]
  const stepThreeFields = ['announcement', 'additionalContent', 'personImage']
  // const formData = watch();
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

    const isValid = await trigger(fieldsToValidate);

    if (isValid && step < 3) {
      setStep(step + 1);
    }
  };


  const onSubmit = async (d) => {
    const obj = { ...d };
    const personImage = obj["personImage"];
    const brandLogo = obj["brandLogo"];
    const serviceImage = obj["serviceImage"];

    const publicationData = { ...obj };
    delete publicationData["personImage"];
    delete publicationData["brandLogo"];
    delete publicationData["serviceImage"];

    const publicationStr = JSON.stringify(publicationData);
    const formData = new FormData();

    if (personImage) formData.append("personImage", personImage);
    if (brandLogo) formData.append("brandLogo", brandLogo);
    if (serviceImage) formData.append("serviceImage", serviceImage);


    formData.append("data", publicationStr);

    try {
      const response = await addWriteArticle(formData);
      if (response?.data?.id) {
        const data = {
          id: id, body: {
            writeArticleId: response?.data?.id, orderType: 'writeArticle', wonArticleId:null } }
        const orderUpdate = await updateOrder(data)
        if (orderUpdate?.data?.id) {
          toast.success('Write article submitted successfully');
          setPublishPopup(true)
          reset()
        }
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit information");
    }
  }

  const errorMessage = (name) => errors?.[name] && <span className="text-red-400 text-xs mt-0.5">
    {errors?.[name].message}
  </span>

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className=" border border-[#DCDEDF] p-6 w-full">
          {step === 1 && <StepOne {...{ register, errorMessage, data, isLoading }} />}
          {step === 2 && <StepTwo {...{ register, errorMessage }} />}
          {step === 3 && <StepThree {...{ register, errorMessage, control }} />}

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
                  className="bg-[#002747] text-white px-16 py-2 cursor-pointer hover:bg-[#075ca1] flex items-center justify-center transition-all duration-200 gap-3"
                >
                  {addWriteArticleLoading ? "Submitting" :"Submit"}
                  {addWriteArticleLoading  &&<LoadingIcon fill='#fff' style={{ height: "20px" }} />}
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