import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from 'react-hot-toast';

import "./style.css";
import { getFromLocalStorage, setToLocalStorage } from '../../../../utils/local-storage';
import { useAddOrderMutation } from "../../../../redux/api/orderApi";
import { getUserInfo } from "../../../../helpers/user/user";
import { LoadingIcon } from "../../../../utils/icons";

const Cart = ({ selectedMethod, setCheckoutPopup }) => {

  const [paymentLoading, setPaymentLoading] = useState(false);
  const [cartItems, setCartItems] = useState(() => {
    const savedData = JSON.parse(getFromLocalStorage("brandableCardData") || '[]');
    const data = savedData.filter(item => item.isChecked);;
    return data;
  });
  const [addOrder] = useAddOrderMutation()

  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    const total = cartItems?.reduce((sum, item) => {
      return sum + (item.isChecked ? Number(item.price) : 0);
    }, 0);
    setSubtotal(total);
  }, [cartItems]);

  // Handler for deleting an item from the cart
  const removeFromCard = (id, title) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== id);
      setToLocalStorage("brandableCardData", JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast.success(`"${title}" removed from cart!`);
  };

  const handleCheckout = async () => {
    setPaymentLoading(true);
    try {
      if (cartItems.length === 0) {
        toast.error('Please select at least one publication to proceed!');
        setPaymentLoading(false);
        return;
      }
      if (!selectedMethod) {
        toast.error('Please select a payment method!');
        setPaymentLoading(false);
        return;
      }

      const publicationIds = cartItems.map(item => item.id).join(',');

      const orderData = {
        publicationIds,
        userId: getUserInfo()?.id,
        paymentMethodId: selectedMethod
      };
      const response = await addOrder(orderData).unwrap();
      const summary = response?.summary || [];

      const failedItems = summary?.filter(s => s.status === 'failed');
      const successItems = summary?.filter(s => s.status === 'success');
      if (failedItems.length > 0) {
        failedItems.forEach((item) => {
          const pubTitle = item.publication?.title || "Unknown Publication";
          toast.error(`Payment Failed: ${pubTitle}`, {
            duration: 3000
          });
        });
      }

      if (successItems.length > 0) {
        toast.success('Order placed successfully for ');
        setCheckoutPopup(true);
      }

    } catch (err) {
      console.error("Checkout Error:", err);
      toast.error(err?.data?.message || 'Server connection error. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "brandableCardData") {
        const saved = e.newValue;
        const data = saved ? JSON.parse(saved) : [];
        setCartItems(data.filter(item => item.isChecked));
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div
      className="bg-white p-5 add-card-container flex-1 h-fit border border-[#DCDEDF]"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl text-[#171819] font-glare">My Cart</h2>
      </div>

      {/* Modal Body - Cart Items */}
      <div className="max-h-[50vh] overflow-y-auto cart-items-container mt-5 pr-5">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems && cartItems.map((item) => (
            <div
              key={item.id}
              className="flex mb-6 last:mb-0 border-b pb-4 border-gray-100 cart-item"
            >
              {/* <input
                type="checkbox"
                key={item.checked}
                checked={item?.isChecked}
                onChange={() => handleCheckboxChange(item.id)}
                className="custom-checkbox h-5 w-5 mr-2"
              /> */}
              <div className="md:mr-4 mr-2.5 md:w-32 w-24 relative md:block hidden">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
                <span className="bg-[#EF873A] text-white md:text-xs text-[8px] md:px-2.5 px-1.5 py-0.5 rounded-sm absolute top-1.5 left-2 whitespace-nowrap">
                  {item.genre}
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
                    <p>Region :</p> <p className='capitalize'>{item.region}</p>
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
                      TAT: {item.tat}
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
      <div className="pt-4 pb-2 border-t border-gray-200">
        <div className="font-normal text-[#222425] flex items-center justify-between gap-2">
          <p className="text-[#222425] font-medium">Subtotal:</p>
          <p className="text-[#222425] text-2xl font-glare">
            ${subtotal.toFixed(2)}
          </p>
        </div>
        <button
        type="button"
          // onClick={() => setCheckoutPopup(true)}
          // to="/user/checkout"
          onClick={handleCheckout}
          disabled={paymentLoading}
          className={`${paymentLoading ? 'bg-[#002747]/70 cursor-no-drop' :'bg-[#002747] cursor-pointer'} text-[18px] text-white py-2 px-8 hover:bg-[#002747]/90 transition  w-full flex  justify-center items-center gap-3 mt-4 text-center`}
        >
          { 
            paymentLoading ? <><LoadingIcon fill='#fff' style={{ height: "20px" }} /> Just a moment...</>:<>Confirm Purchase</>
          }
        </button>
      </div>
    </div>
  );
};

export default Cart;
