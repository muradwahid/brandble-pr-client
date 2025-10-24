/* eslint-disable no-unused-vars */
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt} from "react-icons/fa";
import { useMethodsQuery, useSetupIntentMutation } from "../../../../redux/api/stripepaymentApi";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFormContent from "../../../common/PaymentFormContent";

const PaymentMethod = ({
  activePayment,
  setActivePayment,
  setRemove,
  setMakeDefault,
}) => {
  const [setupIntent] = useSetupIntentMutation();
    const { data, isLoading: isLoadingMethods} = useMethodsQuery();
    const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [showForm, setShowForm] = useState(false);

    const handleAddButtonClick = async () => {
    try {
      setIsLoading(true);
      setClientSecret(''); // Reset previous client secret
    
      const intent = await setupIntent();
      const intentData = intent.data
      const clientSecret = intentData.client_secret;
      
      if (clientSecret) {
        setClientSecret(clientSecret);
        setShowForm(true);
      } else {
        toast.error('Client secret not received from server');
      }
    } catch (error) {
      toast.error('There was a problem with setup. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
   const handleSuccess = () => {
    // onSuccess();
    setShowForm(false);
    setClientSecret('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setClientSecret('');
  };

    // Stripe Elements options
  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0070ba',
        colorBackground: '#ffffff',
        colorText: '#32325d',
        colorDanger: '#df1b41',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
      },
    },
  };

  const publishableKey = 'pk_test_51SBK3hPFRWrLO59dZexPgeb8vS4wShG8puLDduyFCecL3oU7cPmhVvvCOj7rDaNrfaOHkjZ3Dku0fhj79c4m8rGj00JPtghTVR';
  const stripePromise = loadStripe(publishableKey);
  return (
    <div className="w-full">
      <div className="bg-[#F6F7F7] md:flex gap-3.5 p-3.5 mt-10">
        <div className="flex-1 md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Default Method</p>
          </div>
          <p className="text-[#878C91] text-sm">
            You'r paying through this method
          </p>
        </div>
        {
          data?.map((method,index)=>
            method?.isDefault && <div
              key={index}
              onClick={() => setActivePayment(method?.id)}
              className={`bg-white p-1.5 flex items-center justify-between flex-1 border border-[#008CFF]`}
            >
              <label className="w-full" htmlFor="visa_card_1">
                {

                }
                <div className="w-full">
                  <label
                    htmlFor="visa_card_1"
                    className="flex items-center cursor-pointer gap-8 justify-start"
                  >
                    <input
                      type="radio"
                      name="payment_card_default"
                      id="visa_card_1"
                      className="cursor-pointer accent-[#008CFF]"
                      checked={true}
                      onChange={() => setActivePayment(method?.id)}
                    />
                    <p className="text-[#222425] text-sm">{method?.brand.toUpperCase()}</p>
                    {/* <p className="text-[#222425] text-sm">accountemail@gmail.com</p> */}
                  </label>
                  <div className="flex justify-between mt-1.5">
                    <div className="flex items-center gap-2">
                      {/* <img
                    src="https://shorturl.at/gHTiX"
                    alt="VISA"
                    className="w-10 h-auto mr-2"
                  /> */}
                      <p className="text-[#5F6368] text-sm ml-10">******{method?.last4}</p>
                    </div>
                    <button onClick={() => setMakeDefault(true)} className="bg-[#36383A] text-sm font-medium text-white px-3 py-1 cursor-pointer hover:bg-[#222425] transition-all duration-200">
                      Change
                    </button>
                  </div>
                </div>
              </label>
            </div>)
        }

      </div>

      {/* cards */}
      <div className="bg-[#F6F7F7] md:flex p-3.5 mt-6">
        <div className="flex-1  md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Cards</p>
          </div>
          <p className="text-[#878C91] text-sm">Your saved cards</p>
        </div>

        <div className="flex-1 w-full">
        {
            data?.map((method, index) => (!method?.isDefault && method?.type === 'card') && <label
              key={index}
              onClick={() => setActivePayment(method?.id)}
              htmlFor={method?.id}
              className="cursor-pointer"
            >
              <div
                className={`bg-white p-2.5 flex items-center justify-between border ${activePayment == method?.id
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
                  }`}
              >
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="flex items-center cursor-pointer gap-3 justify-start">
                      <input
                        type="radio"
                        name="payment_card"
                        id={method?.id}
                        className="cursor-pointer accent-[#008CFF]"
                      />
                      <p className="text-[#222425] text-sm">{method?.brand.toUpperCase()}</p>
                    </div>
                    <FaRegTrashAlt
                      onClick={() => setRemove(true)}
                      className="text-[#FF5630] cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-4">
                    <p className="text-[#222425] text-sm">Card</p>
                    <p className="text-[#5F6368] text-sm">******{method?.last4}</p>
                  </div>
                </div>
              </div>
            </label>)
        }
 
          {/* <label
            onClick={() => setActivePayment("second")}
            htmlFor="visa_card_2"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border ${
                activePayment == "second"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_2"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt
                    onClick={() => setRemove(true)}
                    className="text-[#FF5630] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("third")}
            htmlFor="visa_card_3"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between mt-4 border ${
                activePayment == "third"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_3"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt
                    onClick={() => setRemove(true)}
                    className="text-[#FF5630] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("fourth")}
            htmlFor="visa_card_4"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between mt-4 border ${
                activePayment == "fourth"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_4"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="https://shorturl.at/8ZNrR"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                  <FaRegTrashAlt
                    onClick={() => setRemove(true)}
                    className="text-[#FF5630] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label> */}
        </div>
      </div>
      {/* Bank Account */}
      {/* <div className="bg-[#F6F7F7] md:flex p-3.5 mt-6">
        <div className="flex-1  md:mb-0 mb-4">
          <div>
            <p className="text-[#5F6368] font-glare">Bank Account</p>
          </div>
          <p className="text-[#878C91] text-sm">Your saved bank accounts</p>
        </div>
        <div className="flex-1 w-full">
          <label
            onClick={() => setActivePayment("five")}
            htmlFor="visa_card_5"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border ${
                activePayment == "five"
                  ? "border-[#008CFF]"
                  : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_5"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <p className="text-[#222425] text-sm">
                      Bangor Savings Bank
                    </p>
                  </div>
                  <FaRegTrashAlt
                    onClick={() => setRemove(true)}
                    className="text-[#FF5630] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">United States</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
          <label
            onClick={() => setActivePayment("six")}
            htmlFor="visa_card_6"
            className="cursor-pointer"
          >
            <div
              className={`bg-white p-2.5 flex items-center justify-between border mt-4 ${
                activePayment == "six" ? "border-[#008CFF]" : "border-[#DCDEDF]"
              }`}
            >
              <div className="w-full">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_6"
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <p className="text-[#222425] text-sm">
                      Bangor Savings Bank
                    </p>
                  </div>
                  <FaRegTrashAlt
                    onClick={() => setRemove(true)}
                    className="text-[#FF5630] cursor-pointer"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">United States</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div> */}
      {
      clientSecret && showForm &&
      <div className="fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px]">
        <div className="w-full max-w-[500px] md:mx-auto h-auto bg-white p-8">
      <Elements stripe={stripePromise} options={options}>
          <PaymentFormContent
            clientSecret={clientSecret}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </Elements>
          </div>
      </div>
      }

      <div className="w-full flex justify-end mt-6">
        <button className="w-full md:w-1/2 bg-white cursor-pointer text-[#1D1F2C] border border-[#1D1F2C] hover:bg-[#1D1F2C] hover:text-white transition-all duration-200 py-1.5" onClick={handleAddButtonClick} disabled={isLoading}>
          Add New Method
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
