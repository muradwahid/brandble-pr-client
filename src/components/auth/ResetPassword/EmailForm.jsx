import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useSendEmailOtpMutation } from "../../../redux/api/authApi";

const EmailForm = () => {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [sendEmail, setSendEmail] = useState(false);
  const navigate = useNavigate();


  const [sendEmailOtp, { isLoading }] = useSendEmailOtpMutation();
  // onSubmit handler
  const onSubmit = async (data) => {
    try {
      const res = await sendEmailOtp({ email: data.email });
      console.log(res);
      if (res?.data?.success) {
        toast.success('OTP sent successfully! Please check your email.');
        navigate('/forgot-password/verify', { state: { email: data.email } });
      } else {
        setError("email", {
          type: "manual",
          message: res?.error?.errorMessages,
        });
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
    }
  };
  return (
    <div className='fixed bg-[#00000020] z-50 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center'>
      <div className='max-w-[500px] w-full bg-white p-10'>
        <div className="w-full">
          <h2 className='text-[#002747] font-glare font-normal text-2xl text-center mb-4'>Forgot Password</h2>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>No worries! Enter your email address below, and we'll send your a link to reset your password.</p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
            <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="email">Email*</label>
            <input className="w-full mt-2 text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type="email" id="email" placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1 font-poppins">{errors.email.message}</p>
            )}
            <button className="bg-[#002747] text-white text-sm font-poppins font-normal py-3 px-2.5 mt-4 w-full cursor-pointer" type="submit">{isLoading ? "Sending..." : "Send"}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;