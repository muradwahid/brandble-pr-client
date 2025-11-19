import { IoMdHeart } from "react-icons/io";
import { AdultIcon, BitcoinIcon, CardiologyIcon, CartIcon, CasinoIcon, SpaIcon } from "../../../../utils/icons";
import { useDeleteFavoriteMutation, useFavoritesQuery } from "../../../../redux/api/favoriteApi";
import { getUserInfo } from "../../../../helpers/user/user";
import SkeletonCard from "../../../common/SkeletonCard";
import toast from "react-hot-toast";
import { getFromLocalStorage, setToLocalStorage } from "../../../../utils/local-storage";

const Favorite = () => {
  const user = getUserInfo()
  const { data = [], isLoading } = useFavoritesQuery(user.id);
  const [ deleteFavorite ] = useDeleteFavoriteMutation()
  
  const handleRemoveToFavorite = async (itemId) => {
    try {
      const response = await deleteFavorite(itemId);
      if (response?.error) {
        toast.error("Failed to remove from favorites.");
        return;
      }
      toast.success("Removed from favorites!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to remove from favorites.");
    }
  }


  const addToCard = (data) => {
    const existingData = JSON.parse(getFromLocalStorage("brandableCardData")) || [];

    // Check if item already exists in cart
    const isAlreadyInCart = existingData.some(item => item.id === data.id);

    if (isAlreadyInCart) {
      // Show error toast if item already exists
      toast.error("Item is already in your cart!");
      return false;
    } else {
      // Add new item to cart
      const updatedData = [...existingData, data];
      setToLocalStorage("brandableCardData", JSON.stringify(updatedData));

      // Show success toast
      toast.success("Item added to cart successfully!");
      return true;
    }
  }

  const cmCls = "text-[#878C91] text-[12px] font-[12px] flex items-center";
  // const isLoading = true;
  return (
    <div>

      <h2 className="md:text-2xl text-[20px] text-[#222425] font-glare mb-6">
        Favorites
      </h2>
      {
        isLoading ? <SkeletonCard /> : data.length > 0 ? <div className="grid  xl:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-4">
          {data.map((item, index) =>               <div
                            key={index}
                            className="md:flex justify-between shadow-md p-3"
                          >
                            <div className="md:flex gap-2.5 justify-between ">
                              <div className="bg-[#F6F6F6] relative md:max-w-[143px] w-full flex items-center justify-center">
                                <div className='min-w-24'>
                                  <img src={item?.logo} alt={item?.title} />
                                </div>
                                <p className="bg-[#DCDEDF] text-[12px] text-[#878C91] font-medium absolute top-1 left-1 px-2 py-0.5">
                                  {item?.genre}
                                </p>
                                <div
                                  onClick={() => {handleRemoveToFavorite(item?.id);}}
                                  className="absolute top-1 right-1 cursor-pointer"
                                >
                                    <IoMdHeart className="text-[#FF5630]" />
                                  
                                </div>
                                <div className="absolute flex bottom-2 bg-white p-0.5 shadow-sm gap-1.5 cursor-pointer">
          
                                  {
                                    item?.niches?.map((niche, i) => {
                                      if (niche?.title?.toLowerCase() === "adult") return <AdultIcon key={i} />;
                                      if (niche?.title?.toLowerCase() === "health") return <CardiologyIcon key={i} />;
                                      if (niche?.title?.toLowerCase() === "cannabis") return <SpaIcon key={i} />;
                                      if (niche?.title?.toLowerCase() === "crypto") return <BitcoinIcon key={i} />;
                                      if (niche?.title?.toLowerCase() === "casino") return <CasinoIcon key={i} />;
                                      return null;
                                    })
                                  }
                                </div>
                              </div>
                              <div className="grid content-between">
                                <h4 className="text-[#002747] text-[16px] mb-1">
                                  {item?.title}
                                </h4>
                                <div>
                                  <div className={cmCls}>
                                    <p className="flex-1/3">Sponsored</p>
                                    <p className="uppercase flex-1/2">: {item?.sponsore}</p>
                                  </div>
                                  <div className={cmCls}>
                                    <p className="flex-1/3">Do Follow</p>
                                    <p className="uppercase flex-1/2">: {item?.doFollow}</p>
                                  </div>
                                  <div className={cmCls}>
                                    <p className="flex-1/3">Indexed</p>
                                    <p className="uppercase flex-1/2">: {item?.index}</p>
                                  </div>
                                  <div className={cmCls}>
                                    <p className="flex-1/3">Region</p>
                                    <p className="flex-1/2">: {item?.region}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 md:flex-nowrap flex-wrap">
                                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                                    DA: {item?.da}
                                  </p>
                                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                                    DR: {item?.dr}
                                  </p>
                                  <p className="bg-[#F2F2F3] text-[11px] text-[#5F6368] font-medium py-0.5 px-1 whitespace-nowrap">
                                    TTP: {item?.ttp}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className=" flex md:grid md:content-between justify-between md:mt-0 mt-2">
                              <p className="md:text-[20px] text-[18px] text-[#36383A] font-glare">
                                <span>&#36;</span>
                                {item?.price}
                              </p>
          
                              <div className="flex justify-end cursor-pointer" onClick={() => addToCard(item)}>
                                <CartIcon className="md:h-[30px] md:w-[30px] h-[24px] w-[24px] fill-[#36383A]" />
                              </div>
                            </div>
                          </div>)}
        </div> :
          <div className="h-[50dvh] flex items-center justify-center ">
            <h1 className="text-3xl">No favorites yet. Tap the heart on any product to add it here.</h1>
          </div>
      }

    </div>
  );
};

export default Favorite;
