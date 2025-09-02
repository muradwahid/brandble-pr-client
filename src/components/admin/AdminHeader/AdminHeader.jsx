import { RxMagnifyingGlass } from 'react-icons/rx';
import profileImg from "../../../assets/adminprofile.png"
import { BellIcon } from '../../../utils/icons';

const AdminHeader = () => {
  return (
    <div className='flex w-full justify-between mb-9'>
      <div className='relative'>
        <RxMagnifyingGlass className="text-[#878C91] absolute top-1/2 -translate-y-1/2 left-2" />
        <input
          className="bg-[#F2F2F3] placeholder:text-[#878C91] p-2 pl-8 rounded-sm lg:w-[500px] w-full text-sm outline-[#004A87]"
          type="search"
          name="search"
          placeholder="Search"
          id="adminSearch"
        />
      </div>
      <div className='flex items-center gap-5'>
        <BellIcon />
        <div className='w-[40px] h-[40px] rounded-[8px] overflow-hidden'>
          <img className='w-full h-full' src={profileImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;