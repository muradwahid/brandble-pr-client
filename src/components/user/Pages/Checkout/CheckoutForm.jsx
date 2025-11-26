import { useEffect, useState } from "react";
import { GoShieldLock } from "react-icons/go";
import "./style.css";
import { useMethodsQuery, useSetupIntentMutation } from "../../../../redux/api/stripepaymentApi";
import { getUserInfo } from "../../../../helpers/user/user";
import { useUserQuery } from "../../../../redux/api/authApi";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { Elements } from "@stripe/react-stripe-js";
import PaymentFormContent from "../../../common/PaymentFormContent";

const CheckoutForm = ({selectedMethod, setSelectedMethod }) => {
    const [setupIntent] = useSetupIntentMutation();
      const { data, isLoading: isLoadingMethods} = useMethodsQuery();
      const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [showForm, setShowForm] = useState(false);
  
      const user = getUserInfo();
  const { data: userData } = useUserQuery(user?.id);
  
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
    // eslint-disable-next-line no-unused-vars
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



  useEffect(() => { 
    setSelectedMethod(data?.filter(method => method?.isDefault)[0]?.stripePaymentMethodId)
  }, [data, setSelectedMethod])
  const inputCls = ` px-3 py-2 bg-[#F6F7F7] border border-[#DCDEDF] outline-none text-[#5F6368] placeholder-[#B2B5B8] placeholder:font-normal w-full`;

  return (
    <div className="w-full flex-1">
      <div className="bg-white w-full">
        <div className="space-y-7">
          {/* personal information */}
          <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Personal Information
              </h3>
            </div>
            {/* Full Name */}
            <div className="flex flex-col w-full mt-4">
              <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className={`${inputCls}`}
                value={userData?.name}
                readOnly
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col w-full my-3.5">
              <label htmlFor="email" className="text-sm text-[#5F6368] mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className={`${inputCls}`}
                value={userData?.email}
                readOnly
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col w-full">
              <label htmlFor="address1" className="text-sm text-[#5F6368] mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className={`${inputCls}`}
                value={userData?.company}
                readOnly
              />
            </div>
          </div>

          {/* billing address */}
          {/* <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Billing Address
              </h3>
            </div>
    
            <div className="flex flex-col w-full mt-4">
              <label htmlFor="fullName" className="text-sm text-[#5F6368] mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                className={`${inputCls}`}
                value="123 Main St, Anytown, USA"
                readOnly
              />
            </div>

            <div className="w-full flex justify-between">
              <div className="flex flex-col mt-4 w-[48%]">
                <label
                  htmlFor="country"
                  className="text-sm text-[#5F6368] mb-1"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  className={`${inputCls}`}
                  value="United States"
                  readOnly
                />
              </div>
              <div className="flex flex-col mt-4 w-[48%]">
                <label htmlFor="state" className="text-sm text-[#5F6368] mb-1">
                  State/ Province/ Region
                </label>
                <input
                  type="text"
                  id="state"
                  className={`${inputCls}`}
                  value="California"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col w-[48%] mt-4">
              <label htmlFor="zipCode" className="text-sm text-[#5F6368] mb-1">
                Postal/ Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                className={`${inputCls}`}
                value="12345"
                readOnly
              />
            </div>
          </div> */}

          {/* payment method */}
          {
            !isLoadingMethods && 
          <div className="border border-[#F2F2F3] p-3.5">
            <div className="border-b border-[#DCDEDF] pb-3">
              <h3 className="text-[20px] text-[#222425] font-glare">
                Payment Method
              </h3>
            </div>
            {/* payment method */}
            <div className="flex items-center justify-between gap-1 mt-4">
              <p className="text-[#5F6368] font-glare font-normal">
                Default Method
              </p>
              <GoShieldLock className="text-[#5F6368] text-sm" />
            </div>
            <div className="flex flex-col w-full mt-4 border-b border-[#DCDEDF] pb-1.5">
              <div className="w-full grid gap-2.5">
                { 
                  data?.map((method) => method?.isDefault && <label
                    htmlFor={method?.stripePaymentMethodId}
                    key={method?.stripePaymentMethodId}
                  >
                    <div className="flex items-center cursor-pointer gap-12 justify-start">
                      <input
                        type="radio"
                        name="payment_card"
                        id={method?.stripePaymentMethodId}
                        checked={selectedMethod === method?.stripePaymentMethodId}
                        onChange={() => setSelectedMethod(method?.stripePaymentMethodId)}
                        className="cursor-pointer accent-[#008CFF]"
                      />
                      <p className="text-[#222425] text-sm capitalize">
                        {method?.brand}
                      </p>
                      {/* <p className="text-[#222425] text-sm">
                        accountemail@gmail.com
                      </p> */}
                    </div>

                    <div className="flex justify-between mt-1.5">
                      <div className="flex items-center gap-2">
                        <p className="text-[#222425] text-md capitalize font-medium">
                          {method?.type}
                        </p>
                        {/* <img
                          src="https://shorturl.at/gHTiX"
                          alt="VISA"
                          className="w-14 h-auto mr-2"
                        /> */}
                        <p className="text-[#5F6368] text-sm">******{method?.last4}</p>
                      </div>
                    </div>
                  </label>)
                }
            
              </div>
            </div>

            {/* other payment methods */}
            <div className="w-full space-y-7 mt-4">
              {
                    data?.map((method) => !method?.isDefault && <label htmlFor={method?.stripePaymentMethodId} key={method?.stripePaymentMethodId} >
                  <div className="w-1/2">
                  <div className="flex justify-between">
                    <div className="flex items-center cursor-pointer gap-3 justify-start">
                      <input
                        type="radio"
                        name="payment_card"
                          checked={selectedMethod === method?.stripePaymentMethodId}
                              onChange={() => setSelectedMethod(method?.stripePaymentMethodId)}
                        className="cursor-pointer accent-[#008CFF]"
                      />
                      {/* <img
                        src="/public/assets/visalogo.png"
                        alt="VISA"
                        className="w-10 h-auto mr-2"
                      /> */}
                        <p className="text-[#222425] text-sm capitalize">
                          {method?.brand}
                        </p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                      <p className="text-[#222425] text-sm capitalize">{method?.type}</p>
                      <p className="text-[#5F6368] text-sm">******{method?.last4}</p>
                  </div>
                </div>  
                </label>
                )
              }
              {/* <div className="w-1/2">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_3"
                      checked={selectedPaymentMethod === "visa_card_3"}
                      onChange={handlePaymentMethodChange}
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="/public/assets/visalogo.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex justify-between">
                  <div className="flex items-center cursor-pointer gap-3 justify-start">
                    <input
                      type="radio"
                      name="payment_card"
                      id="visa_card_4"
                      checked={selectedPaymentMethod === "visa_card_4"}
                      onChange={handlePaymentMethodChange}
                      className="cursor-pointer accent-[#008CFF]"
                    />
                    <img
                      src="/public/assets/visalogo.png"
                      alt="VISA"
                      className="w-10 h-auto mr-2"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="text-[#222425] text-sm">Card</p>
                  <p className="text-[#5F6368] text-sm">******6615</p>
                </div>
              </div> */}
                        {
                        clientSecret && showForm &&
                        <div className="fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px] z-50">
                          <div className="w-full max-w-[500px] md:mx-auto h-auto bg-white p-8 brandable-stripe-pyments-element-container">
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
              <div className="flex justify-end">
                    <button className="text-sm text-[#36383A] bg-[#DCDEDF] px-8 py-2.5 cursor-pointer hover:bg-[#bebfc0] transition-all duration-200" onClick={handleAddButtonClick} disabled={isLoading}>
                  New Payment Method
                </button>
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
