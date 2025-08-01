import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { cartData } from "./data";
import "./style.css";
import { Link } from "react-router";

const Cart = ({ ref, setOpenCart }) => {
  // State to manage the cart items. Each item has an id, name, price, and checked status.
  const [cartItems, setCartItems] = useState(cartData);

  // State to store the calculated subtotal
  const [subtotal, setSubtotal] = useState(0);

  // useEffect hook to recalculate subtotal whenever cartItems state changes
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      // Only add to sum if the item is checked
      return sum + (item.checked ? item.price : 0);
    }, 0);
    setSubtotal(total); // Update the subtotal state
  }, [cartItems]); // Dependency array: runs when cartItems changes

  // Handler for checkbox changes
  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map(
        (item) => (item.id === id ? { ...item, checked: !item.checked } : item) // Toggle checked status for the specific item
      )
    );
  };

  // Handler for deleting an item from the cart
  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove item by filtering its ID
  };

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
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex mb-6 last:mb-0 border-b pb-4 border-gray-100 cart-item"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
                className="custom-checkbox h-5 w-5 mr-2"
              />
              <div className="md:mr-4 mr-2.5 md:max-w-32 w-24 relative">
                <img
                  src="./public/assets/hoodcriticImg.png"
                  alt={item.name}
                  className="h-full w-full"
                />
                <span className="bg-[#EF873A] text-white md:text-xs text-[8px] md:px-2.5 px-1.5 py-0.5 rounded-sm absolute top-1.5 left-2 whitespace-nowrap">
                  {item.tag}
                </span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between md:mb-2">
                  <h3 className="text-[16px] font-normal text-[#36383A]">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 hover:text-red-700 focus:outline-none mb-2 delete-item-btn"
                  >
                    <RiDeleteBin6Line className="text-[#FF8F73] text-[24px] hover:text-red-400 transition cursor-pointer" />
                  </button>
                </div>
                <div className="flex gap-2 flex-wrap text-[12px] font-semibold text-[#878C91] ">
                  <div className="flex gap-1.5">
                    <p>Sponsored :</p> <p>{item.sponsored}</p>
                  </div>
                  <span>•</span>
                  <div className="flex gap-1.5">
                    <p>Indexed :</p> <p>{item.indexed}</p>
                  </div>
                </div>
                <div className="flex md:gap-2 gap-0.5 flex-wrap text-[12px] font-semibold text-[#878C91]  md:mb-1 mb-0.5">
                  <div className="flex gap-1.5">
                    <p className="m-0">Do Follow :</p> <p>{item.doFollow}</p>
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
      <div className="flex justify-between items-center pt-6 pb-2 border-t border-gray-200">
        <div className="font-normal text-[#222425]">
          Subtotal: <span id="subtotal-amount">${subtotal.toFixed(2)}</span>
        </div>
        <Link
          to="/user/checkout"
          onClick={() => setOpenCart(false)} className="bg-[#222425] text-white py-2 px-8 hover:bg-gray-800 transition cursor-pointer">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
