import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuEye, LuEyeClosed } from 'react-icons/lu';
import { KeyIcon } from '../../../utils/icons';
import { useUpdatePasswordMutation } from '../../../redux/api/authApi';
import { getUserInfo } from '../../../helpers/user/user';
import toast from 'react-hot-toast';

const PasswordFieldForm = ({ setShowResetModal, setOtpStep }) => {
  const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: "onChange"
  });

  const userInfo = getUserInfo();

  const password = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

  const [updatePassword, {isLoading}] = useUpdatePasswordMutation();

  const isMatching = password && confirmPassword && password === confirmPassword;

  const onSubmit =async (data) => {
    const password = data.newPassword
    const res = await updatePassword({ password, id: userInfo?.id })
    if (res?.data?.id) {
      toast.success("Password Reset Successfully!");
      setShowResetModal(false);
      setOtpStep(1)
    } else {
      toast.error("Your password has been changed");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border-t border-[#b2b5b8] pt-10 mt-3'>
      {/* New Password Field */}
      <div className='w-full'>
      <label className='text-[#878C91] font-poppins text-sm' htmlFor="newPassword">New Password</label>
      <div className='flex relative w-full mt-3'>
        <input
          {...register("newPassword", { required: 'Password is required.', minLength: { value: 6, message: 'Password must be at least 6 characters long.' } })}
          className={`w-full border outline-0 px-3 py-2.5 text-[#36383A] border-[#DCDEDF] focus:border-[#36383A]`}
          type={showPassword.newPassword ? "text" : "password"}
        />
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))}>
          {showPassword.newPassword ? <LuEyeClosed className='text-[#878C91]' /> : <LuEye className='text-[#878C91]' />}
        </div>
      </div>
        {errors?.newPassword && <span className='text-[#FF5630] font-poppins text-sm tracking-[0.1px]'>
        {errors.newPassword.message}
      </span>}
      </div>

      {/* Repeat Password Field */}
      <div className='mt-3'>
      <label className='text-[#878C91] font-poppins text-sm' htmlFor="confirmPassword">Repeat Password</label>
      <div className='flex relative w-full mt-3'>
        <input
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password || "Password didn’t matched!"
          })}
          className={`w-full border outline-0 px-3 py-2.5 text-[#36383A] border-[#DCDEDF] focus:border-[#36383A]`}
          type={showPassword.confirmPassword ? "text" : "password"}
        />
        <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}>
          {showPassword.confirmPassword ? <LuEyeClosed className='text-[#878C91]' /> : <LuEye className='text-[#878C91]' />}
        </div>
      </div>

      </div>

      {/* Error Message Section */}
      {(confirmPassword && confirmPassword.length>4 && !isMatching) && (
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

      {/* Submit Button */}
      <div className='flex justify-end'>
        <button
          disabled={!isMatching || !isValid}
          className={`mt-10 py-2 px-6 font-poppins font-normal text-sm tracking-[0.1px] transition-all
            ${(!isMatching || !isValid)
              ? 'bg-[#B2B5B8] cursor-not-allowed text-white'
              : 'bg-[#222425] cursor-pointer text-white hover:bg-black'}`}
          type="submit"
        >
          {isLoading? 'Please wait...':'Reset Password'}
        </button>
      </div>
    </form>
  );
};

export default PasswordFieldForm;