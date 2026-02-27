/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useRef, useState } from 'react';
import { ExclamatoryIcon, KeyBoardIcon, XMarkCircle } from '../../../utils/icons';
import { useForm } from 'react-hook-form';
import { BsExclamationOctagon } from 'react-icons/bs';
import { IoCheckmark } from "react-icons/io5";
import PasswordFieldForm from './PasswordFieldForm';
import { useSendEmailOtpMutation, useVerifyOtpMutation } from '../../../redux/api/authApi';
import toast from 'react-hot-toast';

const ResetPassword = ({ userInfo, setShowResetModal }) => {
  const inputsRef = useRef([]);
  const [otpStep, setOtpStep] = useState(1)

  const { register, handleSubmit, setValue, setFocus, watch, formState: { errors } } = useForm({
    defaultValues: {
      otp: new Array(6).fill("")
    }
  });

  const [sendEmailOtp, { isLoading }] = useSendEmailOtpMutation();
  const [verifyOtp, { isLoading: isOtpLoading,error,isError,isSuccess }] = useVerifyOtpMutation()

  const handleSendOtp = async () => { 
    const res = await sendEmailOtp({ email: userInfo?.email });
    if (res?.data?.success) {
      setOtpStep(2)
    } else { 
      toast.error('Something went wrong! Please try again later.')
    }
  }
  
  const otpValues = watch("otp");
  const onSubmit = async(data) => {
    const finalOtp = data.otp.join("");
    const res = await verifyOtp({ email: userInfo?.email, otp: finalOtp });
    if (res?.data?.id) {
      setOtpStep(3)
    }
  };

  const handleChange = (e, index) => {
    const val = e.target.value;
    setValue(`otp.${index}`, val);
    if (val.length === 1 && index < 5) {
      inputsRef.current[index + 1].focus();
    }

    const newOtp = [...inputsRef.current.map(input => input.value)];
    if (newOtp.join("").length === 6) {
      // console.log(newOtp);
      handleSubmit(onSubmit)();
    }


  };

  const handleKeyDown = (e, index) => {

    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData('text').slice(0, 6);
    if (!data) return;
    setValue('otp', data);
    const chars = data.split('');
    chars.forEach((char, index) => {
      if (inputsRef.current[index]) {
        inputsRef.current[index].value = char; 
      }
    });

    const nextIndex = Math.min(chars.length, 5);
    inputsRef.current[nextIndex].focus();

    if (chars.length === 6) {
      handleSubmit(onSubmit)();
    }

  };

  return (
    <div className='fixed bg-[#00000020] z-50 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center'>
      <div className='max-w-[450px] w-full bg-white p-6 relative'>
        <XMarkCircle className='absolute top-6 right-6 cursor-pointer' onClick={() => setShowResetModal(false)} />

        <h2 className='font-glare text-[20px] leading-[150%] tracking-[0.1px] text-[#222425] mb-2'>Change Password</h2>

        {otpStep ===1 && <div className='w-full'>
          <p className='font-poppins text-sm text-[#5f6368] tracking-[0.1px]'>Are you sure you want to change the password? We’ll send an <strong className='text-[#222425] font-medium'>OTP</strong> to your email to proceed...</p>
          <div className='mt-10 flex items-center justify-end'>
            <button onClick={handleSendOtp} className='bg-[#171819] px-6 py-2 text-white text-sm font-poppins cursor-pointer' type='button'>{isLoading? "Sending...":"Send OTP"}</button>
          </div>
        </div>}
{otpStep !==1 && <div className='w-full'>
          <p className='font-poppins text-sm text-[#5f6368] tracking-[0.1px]'>Enter the OTP we’ve sent to your email <strong className='text-[#222425] font-medium'>{userInfo?.email} </strong> to
            reset your password.</p>
          <div className='mt-10 flex items-center gap-3 px-10'>
            {
              [1, 2, 3, 4, 5, 6].map((item, idx) => <Fragment key={idx}>
                <input className={`font-poppins text-[18px] h-10 w-10 border outline-0 p-2 text-center text-[#171819] ${otpValues[idx] ? 'border-[#171819]' : 'border-[#dcdedf]'} ${isError ? 'border-[#ff5630]' : ''} ${isSuccess ?'border-[#36B37E]! text-[#36B37E]!':''}`} type="text" maxLength={1}
                  {...register(`otp.${idx}`, { required: true })}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  autoFocus={idx === 0}
                  onPaste={handlePaste}
                />
                {item === 3 && <span className='bg-[#878c91] rounded-full h-1.5 w-1.5'></span>}
              </Fragment>)
            }
          </div>
          <div className='mt-4 pl-10'>
            {
            
              isError ? <div className='flex items-center gap-2'>
                <ExclamatoryIcon />
                <p className='text-[#ff5630] text-sm font-poppins' dangerouslySetInnerHTML={{ __html: error?.message }} />
              </div> : isSuccess ? <div className='flex items-center gap-2'><IoCheckmark className='text-[#36B37E]' /> <span className='text-[#36B37E] text-sm font-poppins'>OTP verified</span></div> :<div className='flex items-center gap-2'>
                <KeyBoardIcon />
                <p className='text-[#5f6368] text-sm font-poppins'>Input OTP</p>
              </div>
            }


          </div>
      {otpStep===2 && <div className='flex items-center justify-end gap-2 mt-3 pt-3 border-t border-[#b2b5b8] py-4'>
            <BsExclamationOctagon className='text-[#878c91] text-sm' />
            <p className='text-[#878c91] text-sm font-poppins'>Didn’t received OTP? <span className='text-[#36383a] font-medium cursor-pointer' onClick={handleSendOtp}>Send Again</span></p>
          </div>}
        </div>}
        {otpStep === 3 && <PasswordFieldForm setShowResetModal={setShowResetModal} setOtpStep={setOtpStep} />}
      </div>
    </div>
  );
};

export default ResetPassword;