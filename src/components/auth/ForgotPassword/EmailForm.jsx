import { useState } from "react";
import checkEmail from '../../../assets/check_email.png';

const EmailForm = () => {
  // eslint-disable-next-line no-unused-vars
  const [ sendEmail, setSendEmail] = useState(true);
  return (
    <div className='fixed bg-[#00000020] z-50 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-start'>
      <div className='max-w-[500px] w-full bg-white p-10'>
{!sendEmail&&<div className="w-full">
        <h2 className='text-[#002747] font-glare font-normal text-2xl text-center mb-4'>Forgot Password</h2>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>No worries! Enter your email address below, and we'll send your a link to reset your password.</p>
        <form className='mt-10'>
          <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="email">Email*</label>
          <input className="w-full mt-2 text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type="email" id="email" name="email" required placeholder="Enter email" />
          <button className="bg-[#002747] text-white text-sm font-poppins font-normal py-3 px-2.5 mt-4 w-full cursor-pointer" type="submit">Send</button>
        </form>
        </div>}
        {sendEmail && <div className="w-full">
          <img className="max-w-48 mx-auto mb-10" src={checkEmail} alt="Check your email" />
          <h2 className='text-[#002747] font-glare font-normal text-2xl text-center mb-4'>Check your email</h2>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>We sent a password reset link to your email.</p>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>Please check your inbox.</p>
          <button className="bg-[#002747] text-white text-sm font-poppins font-normal py-3 px-2.5 mt-10 w-full cursor-pointer" type="button">Open your email</button>
          <p className="font-poppins text-sm font-normal text-[#5f6368] text-end mt-3">Didn't received the email? <span className="text-[#006ac2] cursor-pointer">Resend</span></p>
        </div>}
      </div>
    </div>
  );
};

export default EmailForm;