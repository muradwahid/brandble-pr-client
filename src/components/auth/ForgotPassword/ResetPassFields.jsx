import { Link } from 'react-router';
import siteLogo from '../../../assets/siteLogo/logo.png';
import { BsExclamationCircle } from 'react-icons/bs';

import keyIcon from '../../../assets/key_icon.png'

const ResetPassFields = () => {
  // const [logIn, setLogin] = useState(true);
  return (
    <div>
       <nav className="w-full py-5 border-b-[0.5px] border-b-[#171819]">
              <div className="xl:w-[1400px] lg:w-4/5 md:w-5/6 w-[90%] mx-auto flex items-center justify-between relative">
                <Link to="/user/profile">
                  <img className="w-[116px] h-[52px]" src={siteLogo} alt="" />
                </Link>
                <div className="hidden md:block">
                  <div className="flex gap-12">
                    <p className="text-[15px]">Publications</p>
                    <p className="text-[15px]">Conferences</p>
                  </div>
                </div>
              </div>
      </nav>
      <div className='fixed bg-[#00000020] z-50 top-0 left-0 bottom-0 right-0 w-full h-full flex items-center justify-center'>
        <div className='max-w-[500px] w-full bg-white p-10'>
          <img className='max-w-48 mx-auto mb-10' src={keyIcon} alt="key icon" />
          <h2 className='text-[#002747] font-glare font-normal text-2xl text-center mb-4'>Create a New Password</h2>
          <p className='font-poppins font-normal leading-[150%] text-center px-5 text-[#171819]'>Enter your new password below to complete the process. Ensure it's strong and secure.</p>
          <form className='mt-10'>
            <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="email">Email*</label>
            <input className="w-full mt-2 text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type="email" id="email" name="email" required placeholder="Enter password" />
            <p className='text-xs text-[#878c91] font-poppins font-medium flex gap-1 mt-2 mb-5'><BsExclamationCircle className='text-sm' /> Must be 8 character</p>
            <label className="text-sm font-poppins font-normal text-[#5f6368]" htmlFor="email">Email*</label>
            <input className="w-full mt-2 text-sm p-2.5 border border-[#dcdedf] placeholder:text-[#b2b5b6] outline-0" type="email" id="email" name="email" required placeholder="Enter password" />
            <button className="bg-[#002747] text-white text-sm font-poppins font-normal py-3 px-2.5 mt-4 w-full cursor-pointer" type="submit">Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default ResetPassFields;