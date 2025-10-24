import { IoMdHeart } from "react-icons/io";
import { AdultIcon, BitcoinIcon, CardiologyIcon, CartIcon, CasinoIcon, SpaIcon } from "../../../../utils/icons";
import { favoriteData } from "./data";

const Favorite = () => {
  const cmCls = "text-[#878C91] text-[12px] font-[12px] flex items-center";
  return (
    <div>
      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare mb-6">
        Favorites
      </h2>
      {/* <div className="grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
        {favoriteData.map((item, index) => (
          <div
            key={index}
            className="xl:flex justify-between shadow-md p-3"
          >
            <div className="xl:flex gap-3">
              <div className="bg-[#F6F6F6] relative md:max-w-[143px] w-full flex items-center justify-center">
                <div className="w-full">
                  <img src={""} alt="" className="w-full" />
                </div>
                <p className="bg-[#DCDEDF] text-[12px] text-[#878C91] font-medium absolute top-1 left-1 px-2 py-0.5">
                  Music
                </p>
                <div className="absolute top-1 right-1 cursor-pointer">
                  <IoMdHeart className="text-[#FF5630]" />
                </div>
                <div className="absolute flex bottom-2 bg-white p-0.5 shadow-sm gap-1.5 cursor-pointer">
                  <AdultIcon />
                  <CardiologyIcon />
                  <SpaIcon />
                  <BitcoinIcon />
                  <CasinoIcon />
                </div>
              </div>
              <div className="grid content-between">
                <h4 className="text-[#002747] text-[16px] mb-1">
                  The CInephile
                </h4>
                <div>
                  <div className={cmCls}>
                    <p className="flex-1/3">Sponsored</p>
                    <p className="uppercase flex-1/2">: yes</p>
                  </div>
                  <div className={cmCls}>
                    <p className="flex-1/3">Do Follow</p>
                    <p className="uppercase flex-1/2">: no</p>
                  </div>
                  <div className={cmCls}>
                    <p className="flex-1/3">Indexed</p>
                    <p className="uppercase flex-1/2">: yes</p>
                  </div>
                  <div className={cmCls}>
                    <p className="flex-1/3">Region</p>
                    <p className="flex-1/2">: United States</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 md:flex-nowrap flex-wrap">
                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                    DA: 95
                  </p>
                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                    DR: 95
                  </p>
                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                    TTP: 1-3 Days
                  </p>
                </div>
              </div>
            </div>
            <div className="flex xl:grid xl:content-between justify-between xl:mt-0 mt-2">
              <p className="md:text-[20px] text-[18px] text-[#36383A] font-glare">
                <span>&#36;</span>
                500
              </p>

              <div className="flex justify-end cursor-pointer">
                <CartIcon className="md:h-[30px] md:w-[30px] h-[24px] w-[24px] fill-[#36383A]" />
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="h-[50dvh] flex items-center justify-center ">
        <h1 className="text-3xl">No favorites yet. Tap the heart on any product to add it here.</h1>
      </div>
    </div>
  );
};

export default Favorite;
