import { LeftArrowIcon } from "../../../../utils/icons";
import CheckoutForm from "./CheckoutForm";

const Checkout = () => {
  return (
    <div className="w-full">
            <button
              className="text-[#002747] hover:text-[#075ca1] hover:fill-[#075ca1] text-[16px] flex items-center gap-2.5 cursor-pointer -mt-4"
              onClick={() => window.navigation.back()}
            >
              <LeftArrowIcon />
              Back
            </button>
      <div className="border w-4/5 mx-auto mt-6">
        <CheckoutForm/>
      </div>
    </div>
  );
};

export default Checkout;
