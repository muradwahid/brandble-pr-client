import { useState } from "react";
import { GoCheckCircle } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { useMethodsQuery, useSetDefaultMutation } from "../../../../redux/api/stripepaymentApi";
import toast from "react-hot-toast";

const MakeDefaultModal = ({
  ref,
  onChange = () => { },
  setRemove = () => { },
}) => {
  const [methodId, setMethodId] = useState('');
  const { data, isLoading } = useMethodsQuery();
  const [setDefault,{isLoading:isSettingDefault}] = useSetDefaultMutation();

  const handleSetDefault = async () => {
    if (!methodId) return toast.error('Please select a payment method to set as default.');
    try {
      const result = await setDefault({ paymentMethodId: methodId }).unwrap();
      if (result?.id) {
        toast.success('Default payment method updated successfully.');
        setRemove("remove");
        onChange(false);
        setMethodId('');
      } else { 
        toast.error('Failed to set default payment method. Please try again.');
        return;
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error('Failed to set default payment method. Please try again.');
      return;
    }
  }

  return <div className="fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px]">
    {
      isLoading ?
        <div class="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 mx-4">
        <div class="animate-pulse flex flex-col items-center">
          <div class="w-20 h-20 bg-gray-300 rounded-full mb-6"></div>

          <div className="w-3/4">
            <div class="space-y-2 w-full">

              <div class="p-4 border border-gray-200 rounded-lg flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-300 rounded-md"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-300 rounded w-3/5"></div>
                  <div class="h-4 bg-gray-300 rounded w-2/5"></div>
                </div>
              </div>
              <div class="p-4 border border-gray-200 rounded-lg flex items-center space-x-4">
                <div class="w-12 h-12 bg-gray-300 rounded-md"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-300 rounded w-3/5"></div>
                  <div class="h-4 bg-gray-300 rounded w-2/5"></div>
                </div>
              </div>
            </div>
            <div class="flex justify-between space-x-4 w-full mt-8">
              <div class="h-12 bg-gray-200 rounded-lg w-32"></div>
              <div class="h-12 bg-gray-800 rounded-lg w-32"></div>
            </div>
          </div>

        </div>
      </div>:
      <div
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-xl relative"
        ref={ref}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-200 ease-in-out cursor-pointer"
          onClick={() => onChange(false)}
        >
          <RxCrossCircled className="text-[20px]" />
        </button>

        <div className="flex justify-center mb-6 mt-4">
          <div
            className="bg-[#222425] p-4 rounded-full flex items-center justify-center makeDefault-icon-shadow"
            style={{ width: "70px", height: "70px" }}
          >
            <GoCheckCircle className="text-white text-3xl" />
          </div>
        </div>

        <div className="mb-4 relative w-3/4 mx-auto overflow-y-auto">
          <div
            className="w-full max-h-56"
          >
            {data?.map((method, index) => (
              <div key={index} onClick={() => setMethodId(method?.id)} className={`w-full bg-white hover:bg-[#F6F7F7] cursor-pointer transition flex p-1.5 border ${method?.isDefault || methodId === method?.id ? ' border-[#008CFF]' : ' border-[#F2F2F3]'}`}>
                {/* <div className="max-w-20 grid content-center bg-[#F2F2F3] px-2.5 py-6">
                  <img
                    src="public/assets/paypallogo.png"
                    alt="VISA"
                    className="h-auto"
                  />
                </div> */}
                <div className="flex items-center gap-4 w-full">
                  {method?.isDefault ? <GoCheckCircle className="text-[#008CFF] text-2xl mt-2" /> : <RxCrossCircled className="text-gray-400 text-2xl mt-2" />}
                  <div className="">
                <div>
                  <p className="text-[#222425] text-md">
                    {method?.brand.toUpperCase()}
                  </p>
                </div>
                <div className="grid cursor-pointer content-between py-1">
                  <p className="text-[#222425] text-sm">
                    {method?.email}
                  </p>
                  <p className="text-[#5F6368] text-sm">******{method?.last4}</p>
                </div>
                </div>
                  </div>
              </div>
            ))}
          </div>
        </div>

          {methodId && data?.length>1&& <p className="text-xl font-medium text-gray-800 leading-relaxed font-glare text-center mb-4 font-glare">
          Are you sure you want to make this default payment method?
        </p>}

        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 transition font-medium py-2 px-6 rounded-sm cursor-pointer"
            onClick={() => onChange(false)}
          >
            Cancel
          </button>
          <button
            className="bg-[#222425] text-white font-medium py-2 px-6 rounded-sm transition t cursor-pointer hover:bg-[#36383A]"
            onClick={() => {
              handleSetDefault()
              }}
              disabled={isSettingDefault && data?.length>1?false:true}
          >
            Yes, Make it Default
          </button>
        </div>
      </div>
    }
    </div>
};

export default MakeDefaultModal;
