import { LeftArrowIcon } from "../../../../utils/icons";
import Cart from "./Cart";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";
import CheckoutPopup from "./CheckoutPopup";

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [checkoutPopup, setCheckoutPopup] = useState(false);
  const [selectOrderId,setSelectOrderId] = useState('')

  return (
    <div className="w-full">

      <button
        className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer -mt-4"
        onClick={() => window.navigation.back()}
      >
        <LeftArrowIcon />
        Back
      </button>
      <div className=" w-4/5 mx-auto mt-6 flex lg:gap-20 gap-10 lg:flex-row flex-col-reverse">
        <CheckoutForm {...{selectedMethod, setSelectedMethod} }/>
        <Cart setCheckoutPopup={setCheckoutPopup} selectedMethod={selectedMethod} setSelectOrderId={setSelectOrderId} />
      </div>
      {checkoutPopup && <CheckoutPopup setCheckoutPopup={setCheckoutPopup} selectOrderId={selectOrderId}/>}
    </div>
  );
};

export default Checkout;
