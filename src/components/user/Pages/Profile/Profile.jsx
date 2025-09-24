import { useState } from "react";
import profileImg from "../../../../assets/profile2.png";
import { AddImageIcon, LoadingIcon, PenIcon } from "../../../../utils/icons";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import { useUpdateUserMutation, useUserQuery } from '../../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [general, setGeneral] = useState(true);
  const [security, setSecurity] = useState(true);


  const {
    register,
    handleSubmit,
    formState: { errors }, setValue, reset
  } = useForm();

  const id = "ad44b1de-c9d3-4fd3-9058-88e1f456d987"
  const { data } = useUserQuery(id);

  const [updateUser, {isLoading}] = useUpdateUserMutation();

  const onSubmit = async (d) => {
    const obj = { ...d };
    const logo = obj["image"];
    const publicationData = { ...obj };
    delete publicationData["image"];
    const formData = new FormData();
    if (logo) {
      formData.append("file", logo);
    }

    const validData = {}
    Object.keys(publicationData).forEach((key) => {
      if (publicationData[key] !== '' && publicationData[key] !== undefined && publicationData[key] !== null) {
        if (Array.isArray(publicationData[key])) {
          validData[key] = JSON.stringify(publicationData[key]);
        } else {
          validData[key] = publicationData[key];
        }
      }
    });

    if (validData) {
      formData.append("data", JSON.stringify(validData));

    }

    if (formData) {

      try {
        await updateUser({ id, body: formData });
        toast.success("User profile updated successfully");
      } catch (err) {
        // console.error(err.message);
        toast.error(err.message);
      }
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('image', file)
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };



  return (
    <div className="xl:w-[650px] lg:w-full 2xl:ml-52 xl:ml-48 lg:ml-32 md:ml-6 ">
      <div className="border-b-[1px] border-[#b2b5b8] pb-5">
        <h3 className="text-[#222425] text-2xl">Profile</h3>
      </div>
      {/* profile image */}
      <div className="lg:flex mt-4" >
        <h4 className="text-[#36383A] text-[20px] flex-1 font-glare">
          Image
        </h4>
        <div className="flex-[1.5] w-fit mt-3 lg:mt-0">
          <div className='xl:w-[125px] xl:h-[125px] lg:w-[100px] lg:h-[100px] md:w-[80px] h-[80px] w-[80px] bg-[#E6E6E6] relative'>
            <label
              className="w-fit flex cursor-pointer"
              htmlFor="profileImage"
            >
              <div className='xl:w-[125px] xl:h-[125px] lg:w-[100px] lg:h-[100px] md:w-[80px] h-[80px] w-[80px] bg-[#E6E6E6] relative'>
                <PenIcon className="absolute top-0 right-[0px] translate-x-[50%] translate-y-[-50%] bg-white rounded-full" />
                {(imagePreview || data?.image) && <img
                  className="w-full h-full object-cover"
                  src={`${imagePreview || data?.image}`}
                  alt=""
                />}
                {
                  data?.image ? "" : !imagePreview && <AddImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                }
                <input
                  className="hidden"
                  type="file"
                  name="image"
                  {...register('image')}
                  id="profileImage"
                  onChange={(e) => {
                    handleImageChange(e)
                  }}
                  accept="image/*"
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* general Information */}
        <div className="lg:flex  items-start mt-16">
          <h4 className="text-[#36383A] text-[20px] flex-1 flex justify-between font-glare">
            General Information
            <div className="block lg:hidden">
              <p
                onClick={() => setGeneral(!general)}
                className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
              >
                {general ? "Edit" : "Cancel"}
                {!general ? <RxCross2 /> : null}
              </p>
            </div>
          </h4>
          <div className="flex-[1.5]">
            <div className="hidden lg:block">
              <div className="flex justify-end">
                <p
                  onClick={() => setGeneral(!general)}
                  className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
                >
                  {general ? "Edit" : "Cancel"}
                  {!general ? <RxCross2 /> : null}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="profileName"
              >
                Profile Name
              </label>
              <input
                type="text"
                disabled={general}
                placeholder="Type here"
                contentEditable="true"
                id="profileName"
                {...register("name", {
                  required: "Profile name is missing.",
                })}
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                value={data?.name}
              />
              {errors.name && (
                <span className="text-red-400 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label className="text-[#878C91] text-[14px]" htmlFor="company">
                Company
              </label>
              <input
                type="text"
                placeholder="Type here"
                {...register("company")}
                disabled={general}
                id="company"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                defaultValue={data?.name}
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                type="text"
                placeholder="Type here"
                disabled={general}
                {...register("designation")}
                id="designation"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                defaultValue={data?.designation}
              />
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Type here"
                {...register("phoneNumber")}
                id="phoneNumber"
                disabled={general}
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                defaultValue={data?.phoneNumber}
              />
            </div>
          </div>
        </div>
        {/* security Information */}
        <div className="lg:flex items-start mt-16">
          <h4 className="text-[#36383A] text-[20px] flex-1 flex justify-between font-glare">
            Security
            <div className="block lg:hidden">
              <p
                onClick={() => setSecurity(!security)}
                className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
              >
                {security ? "Edit" : "Cancel"}
                {!security ? <RxCross2 /> : null}
              </p>
            </div>
          </h4>
          <div className="flex-[1.5]">
            <div className="hidden lg:block">
              <div className="flex justify-end">
                <p
                  onClick={() => setSecurity(!security)}
                  className="text-[15px] text-[#5F6368] border-[1px] border-[#DCDEDF] px-1.5 py-0.5 cursor-pointer flex items-center gap-1"
                >
                  {security ? "Edit" : "Cancel"}
                  {!security ? <RxCross2 /> : null}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <label
                className="text-[#878C91] text-[14px]"
                htmlFor="profileName"
              >
                Email
              </label>
              <input
                type="email"
                disabled={security}
                placeholder="Email"
                name="profileName"
                {...register("email", {
                  required: "Email is empty.",
                })}
                id="profileName"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                defaultValue={data?.email}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1.5 mt-5">
              <div className="flex justify-between">
                <label className="text-[#878C91] text-[14px]" htmlFor="company">
                  Password
                </label>
                <Link className="text-[#878C91] text-[14px] underline">
                  Change Password
                </Link>
              </div>
              <input
                type="password"
                placeholder="Type here"
                disabled={security}
                {...register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                })}
                id="password"
                className="w-full text-[#36383A] text-[15px] py-1.5 px-2 border-1 border-[#DCDEDF] focus:outline-2 focus:outline-[#004A87]"
                defaultValue={data?.password}
              />
              {errors.password && (
                <span className="text-red-400 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex justify-end mt-5">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#171819] hover:shadow-xl transition-all ease-in-out duration-300 text-[15px] text-white py-1.5 px-5 cursor-pointer flex items-center gap-3"
              >Save Changes {isLoading && <LoadingIcon fill='#fff' style={{ height: "20px" }} />}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
