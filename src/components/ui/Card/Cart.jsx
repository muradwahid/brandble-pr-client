import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import "./style.css";
import {  useNavigate } from "react-router";
import { getFromLocalStorage, setToLocalStorage } from '../../../utils/local-storage';
import toast from 'react-hot-toast';
import { LoadingIcon } from '../../../utils/icons';

const Cart = ({ ref, setOpenCart }) => {
  // Get initial data from localStorage
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(() => {
    const savedData = getFromLocalStorage("brandableCardData");
    return savedData ? JSON.parse(savedData) : [];
  });

  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const total = cartItems?.reduce((sum, item) => {
      return sum + (item.isChecked ? Number(item.price) : 0);
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  // Handler for checkbox changes
  const handleCheckboxChange = (id) => {
    setCartItems(prevItems => {
      const nextItems = prevItems.map(item =>
        item.id === id
          ? { ...item, isChecked: !item.isChecked }
          : item
      );

      // persist updated array
      localStorage.setItem("brandableCardData", JSON.stringify(nextItems));
      return nextItems;
    });
  };


  // Handler for deleting an item from the cart
  const removeFromCard = (id, title) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      setToLocalStorage("brandableCardData", JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast.success(`"${title}" removed from cart!`);
  };

  const handleCheckoutBtn = () => {
    setIsLoading(true)
    if (subtotal < 1) {
      setIsLoading(false)
      return toast.error('Select at least one item!')
    }
    if (cartItems.length < 1) {
      setIsLoading(false)
      return toast.error("Your cart is empty!")
    }
    navigate('/user/checkout')
    setIsLoading(false)
    setOpenCart(false)
  }

  return (
    <div
      className="bg-white absolute top-[70px] right-0 w-full max-w-[526px] overflow-hidden p-5 z-10 add-card-container"
      ref={ref}
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl text-[#171819] font-glare">My Cart</h2>
        <button
          onClick={() => setOpenCart(false)}
          className="text-gray-400 cursor-pointer hover:text-gray-600 focus:outline-none"
        >
          <RxCrossCircled className="text-[20px]" />
        </button>
      </div>

      {/* Modal Body - Cart Items */}
      <div className="max-h-96 overflow-y-auto cart-items-container mt-5 pr-5">
        {cartItems?.length === 0 ? (
          <p className="text-center text-gray-600 mb-5">Your cart is empty.</p>
        ) : (
          cartItems?.map((item) => (
            <div
              key={item.id + item.isChecked}
              className="flex mb-6 last:mb-0 border-b pb-4 border-gray-100 cart-item"
            >
              <input
                type="checkbox"
                checked={item.isChecked || false}
                onChange={() => handleCheckboxChange(item.id)}
                className="custom-checkbox h-5 w-5 mr-2"
              />
              <div className="md:mr-4 mr-2.5 md:w-32 w-24 relative">
                <img
                  src={item.logo}
                  alt={item.title}
                  className="h-full w-full object-contain"
                />
                <span className="bg-[#EF873A] text-white md:text-xs text-[8px] md:px-2.5 px-1.5 py-0.5 rounded-sm absolute top-1.5 left-2 whitespace-nowrap">
                  {item?.genre}
                </span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between md:mb-2">
                  <h3 className="text-[16px] font-normal text-[#36383A]">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => removeFromCard(item?.id, item?.title)}
                    className="text-red-500 hover:text-red-700 focus:outline-none mb-2 delete-item-btn"
                  >
                    <RiDeleteBin6Line className="text-[#FF8F73] text-[24px] hover:text-red-400 transition cursor-pointer" />
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap text-[12px] font-semibold text-[#878C91] ">
                  <div className="flex gap-1.5">
                    <p>Sponsored :</p> <p className='capitalize'>{item.sponsor}</p>
                  </div>
                  <span>•</span>
                  <div className="flex gap-1.5">
                    <p>Indexed :</p> <p className='capitalize'>{item.index}</p>
                  </div>
                </div>
                <div className="flex md:gap-2 gap-0.5 flex-wrap text-[12px] font-semibold text-[#878C91]  md:mb-1 mb-0.5">
                  <div className="flex gap-1.5">
                    <p className="m-0">Do Follow :</p> <p className='capitalize'>{item.doFollow}</p>
                  </div>
                  <span>•</span>
                  <div className="flex gap-1.5">
                    <p>Region :</p> <p>{item.region}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center md:text-[11px] text-[10px]">
                    <span className="bg-[#F2F2F3] text-[#5F6368] font-semibold px-2 py-0.5 mr-2">
                      DA: {item.da}
                    </span>
                    <span className="bg-[#F2F2F3] text-[#5F6368] font-semibold px-2 py-1 mr-2">
                      DR: {item.dr}
                    </span>
                    <span className="bg-[#F2F2F3] text-[#5F6368] font-semibold px-2 py-1">
                      TAT: {item.ttp}
                    </span>
                  </div>
                  <span className="flex items-center md:text-[20px] text-[18px] text-[#36383A] font-glare">
                    ${item.price}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Footer */}
      <div className="flex justify-between items-center pt-6 pb-2 border-t border-gray-200">
        <div className="font-normal text-[#222425]">
          Subtotal: <span id="subtotal-amount">${subtotal.toFixed(2)}</span>
        </div>
        <button
          type='button'
          // to="/user/checkout"
          onClick={() => handleCheckoutBtn()}
          className="bg-[#222425] text-white py-2 px-8 hover:bg-gray-800 transition cursor-pointer flex items-center gap-3"
        >
          Checkout
          {isLoading && <LoadingIcon fill='#fff' style={{ height: "20px" }} />}
        </button>
      </div>
    </div>
  );
};

export default Cart;
