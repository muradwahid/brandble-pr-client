import { Link, useLocation, useNavigate } from 'react-router';
import { BsExclamationCircle } from 'react-icons/bs';
import { LuEye, LuEyeClosed } from 'react-icons/lu';

import keyIcon from '../../../assets/key_icon.png'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { KeyIcon } from '../../../utils/icons';
import { useForgotPasswordMutation } from '../../../redux/api/authApi';

const ResetPassFields = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  const password = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const isMatching = password && confirmPassword && password === confirmPassword;

  const userEmail = location?.state?.email;
  const onSubmit = async (data) => {
    const password = data.newPassword
    const res = await forgotPassword({ newPassword: password, email: userEmail })
    if (res?.data?.id) {
      toast.success("Your password has been changed successfully!");
      navigate('/signin');
    } else {
      toast.error("Failed to reset password. Please try again.");
    }
  };


  return (
    <div>
      <div className='fixed bg-[#00000020] z-50 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center'>
        <div className='max-w-[500px] w-full bg-white p-10'>
          <img className='max-w-48 mx-auto mb-10' src={keyIcon} alt="key icon" />
          <h2 className='text-[#002747] font-glare font-normal text-2xl text-center mb-4'>Create a New Password</h2>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>Enter your new password below to complete the process. Ensure it's strong and secure.</p>
          <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
            <div>
              <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="password">New Password*</label>
              <div className='flex relative w-full mt-2'>
                <input className="w-full text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type={showPassword.newPassword ? "text" : "password"} {...register("newPassword", { required: 'Password is required.', minLength: { value: 8, message: 'Password must be at least 8 characters long.' } })} placeholder="Enter password" />

                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword({ ...showPassword, newPassword: !showPassword.newPassword })}>
                  {showPassword.newPassword ? <LuEyeClosed className='text-[#878c91]' /> : <LuEye className='text-[#878c91]' />}
                </div>

              </div>
              <span>{errors.newPassword && <p className='text-xs text-[#FF5630] font-poppins font-medium'>{errors.newPassword.message}</p>}</span>
              <p className='text-xs text-[#878c91] font-poppins font-medium flex gap-1 mt-2 mb-5'><BsExclamationCircle className='text-sm' /> Must be 8 character</p>
            </div>

            <div>
              <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="password">New Password*</label>
              <div className='flex relative w-full mt-2'>
                <input className="w-full text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type={showPassword.confirmPassword ? "text" : "password"} placeholder="Enter password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) => value === password || "Password didn’t matched!"
                  })}
                />

                <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword({ ...showPassword, confirmPassword: !showPassword.confirmPassword })}>
                  {showPassword.confirmPassword ? <LuEyeClosed className='text-[#878c91]' /> : <LuEye className='text-[#878c91]' />}
                </div>

              </div>
            </div>

            {/* Error Message Section */}
            {(confirmPassword && confirmPassword.length > 4 && !isMatching) && (
              <div className='flex items-center gap-2 mt-2 justify-end'>
                <KeyIcon className="text-[#FF5630]" />
                <span className='text-[#FF5630] font-poppins text-sm tracking-[0.1px]'>
                  Password didn’t matched!
                </span>
              </div>
            )}
            {
              confirmPassword && isMatching && <div className='flex items-center gap-2 mt-2 justify-end'>
                <KeyIcon className="text-[#36b37e]" />
                <span className='text-[#36b37e] font-poppins text-sm tracking-[0.1px]'>
                  Password matched.
                </span>
              </div>
            }
            <button disabled={!isMatching || !isValid || isLoading} className="bg-[#002747] text-white text-sm font-poppins font-normal py-3 px-2.5 mt-4 w-full cursor-pointer" type="submit">{isLoading ? "Updating..." : "Update"}</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ResetPassFields;