import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2, RxCrossCircled } from "react-icons/rx";
import { useDeletePublicationMutation } from "../../../../redux/api/publicationApi";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingIcon } from '../../../../utils/icons';
import { Navigate, useNavigate } from 'react-router';

const RemoveModal = ({
  ref,
  onChange = () => { },
  id,
}) => {
  const [deletePublication] = useDeletePublicationMutation();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeletePublication = async (id) => {
    setIsLoading(true);
    const deleteId= toast.loading("Deleting...");
    try {
      const result = await deletePublication(id);
      console.log(result)
      setIsLoading(false);
      toast.success("Publication deleted successfully!",{id:deleteId});
      onChange(false);
            setTimeout(() => {
        navigate("/admin/publications", { replace: true });
      }, 500);
    } catch (err) {
      // console.error(err.message);
      setIsLoading(false);
      toast.error(err.message,{id:deleteId});
    }
  };

  return (
    <div className={"fixed inset-0 bg-[#22242580] flex justify-center items-center p-4 backdrop-blur-[2px] z-50"}>
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative"
        ref={ref}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none transition duration-200 ease-in-out cursor-pointer"
          onClick={() => onChange(false)}
        >
          {/* <RxCross2 className="text-2xl" /> */}
          <RxCrossCircled className="text-[20px]" />
        </button>

        <div className="flex justify-center mb-6 mt-4">
          <div
            className="bg-white p-4 rounded-full flex items-center justify-center removeModal-icon-shadow"
            style={{ width: "70px", height: "70px" }}
          >
            <RiDeleteBin6Line className="text-[#DE350B] text-3xl" />
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-xl font-medium text-gray-800 leading-relaxed font-glare">
            Are you sure you want to remove this publication?
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-200 text-gray-700 font-medium py-2 px-6 rounded-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out cursor-pointer"
            onClick={() => onChange(false)}
          >
            No, Keep
          </button>
          <button
            className={`bg-[#DE350B]  text-white font-medium py-2 px-6 rounded-sm hover:bg-red-700 focus:outline-none ${isLoading ? 'bg-[#e95c39] hover:bg-[#e95c39]!' : ''} focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-150 ease-in-out cursor-pointer flex items-center gap-1.5`}
            disabled={isLoading}
            onClick={() => handleDeletePublication(id)}
          >
            Yes, Remove {isLoading && <LoadingIcon fill='#fff' style={{ height: "20px" }} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
