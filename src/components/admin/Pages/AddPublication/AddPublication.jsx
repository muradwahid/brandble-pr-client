import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countries from "../../../../assets/countries.json";
import { useAddPublicationMutation } from "../../../../redux/api/publicationApi";
import { AddImageIcon, ArrowDownIcon } from "../../../../utils/icons";
import MultiSelectToken from "../../../ui/MultiSelectToken/MultiSelectToken";
import SelectControl from "../../../ui/SelectControl/SelectControl";
import { useAddNicheMutation, useNichesQuery } from "../../../../redux/api/nicheApi";

const AddPublication = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [niches, setNiches] = useState([])
  
  const { data: nichesData, isLoading: nichesLoading } = useNichesQuery();
  const [addNiche, { isLoading:addNicheLoading }] = useAddNicheMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },setValue,
  } = useForm();

  const [addPublication, { isLoading, isError, error }] =
    useAddPublicationMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // useEffect(() => {
  //   return () => {
  //     if (imagePreview) URL.revokeObjectURL(imagePreview);
  //   };
  // }, [imagePreview]);

  useEffect(()=>console.log(nichesData),[nichesData])

  const onSubmit = (d) => {
    const obj = { ...d };
    const logo = obj["logo"];
    const publicationData = { ...obj };
    delete publicationData["logo"];
    console.log(publicationData);
    const publicationStr = JSON.stringify(publicationData);
    const formData = new FormData();
    formData.append("logo", logo);
    formData.append("data", publicationStr);

    try {
      // const result = await addPublication(formData);
      // alert(result.data);
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to add publication");
    }

    console.log(error)
  };

  const handleAddNiche = async (val) => { 
      try {
        await addNiche({title:val})
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <div className="border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="font-glare text-[#5F6368] text-[20px] tracking-[-0.1px]">
            Publication Logo
          </p>
          {/* Logo */}
          <div className="h-[150px] w-[150px] bg-[#E6E6E6] relative ">
            <label className="h-[150px] w-[150px]" htmlFor="publicationLogo">
              {imagePreview && (
                <img
                  className="h-full w-full object-cover"
                  src={imagePreview}
                  alt=""
                />
              )}
              {!imagePreview && (
                <AddImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </label>
            <input
              className="hidden"
              onChange={(e) => handleImageChange(e)}
              type="file"
              name="logo"
              accept="image/*"
              id="publicationLogo"
            />
          </div>
        </div>
        <div className="mt-10">
          <label htmlFor="">
            <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
              Publication Name
            </p>
            <input
              type="text"
              className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] w-full px-3 py-2 font-poppins text-[#171819] text-sm placeholder:text-[#B2B5B8]"
              {...register("title", {
                required: "Title is required",
              })}
              placeholder="Type publication name"
            />
            {errors.title && (
              <span className="text-red-400 text-xs">
                {errors.title.message}
              </span>
            )}
          </label>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-6 mt-5  w-full">
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Domain Authority (DA)
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full text-sm placeholder:text-[#B2B5B8]"
                {...register("da", {
                  required: "Domain Authority is required",
                })}
                placeholder="Ex: 90"
              />
              {errors.da && (
                <span className="text-red-400 text-xs">
                  {errors.da.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Domain Rating (DR)
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full text-sm placeholder:text-[#B2B5B8]"
                {...register("dr", {
                  required: "Domain Rating is required",
                })}
                placeholder="Ex: 96"
              />
              {errors.dr && (
                <span className="text-red-400 text-xs">
                  {errors.dr.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5 ">
                Niche
              </p>
              <MultiSelectToken
                value={niches}
                {...register("niche", {
                  required: "Niche are required",
                })}
                options={nichesData?.niches || []}
                onChange={(value) => {
                  setNiches(value);
                  setValue("niche", JSON.stringify(value));
                }}
                onAddNiche={(v) => handleAddNiche(v)}
                isLoading={addNicheLoading}
              />
              <input
                type="hidden"
                {...register("niche", {
                  required: "Niche are required",
                  validate: (value) => {
                    const parsedValue = JSON.parse(value || "[]");
                    return parsedValue.length > 0 || "Niche are required";
                  },
                })}
                value={JSON.stringify(niches)}
              />
              {errors.niche && (
                <span className="text-red-400 text-xs">
                  {errors.niche.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                TTP
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full text-sm placeholder:text-[#B2B5B8]"
                {...register("ttp", {
                  required: "TTP is required",
                })}
                placeholder="Ex: 5-10 days"
              />
              {errors.ttp && (
                <span className="text-red-400 text-xs">
                  {errors.ttp.message}
                </span>
              )}
            </label>
            <div>
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Genre
              </p>
              <SelectControl
                options={["Yes", "No"]}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="genre"
                errorLabel="Genre"
              />
              {errors.genre && (
                <span className="text-red-400 text-xs">
                  {errors.genre.message}
                </span>
              )}
            </div>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Price <span className="text-[#B2B5B8]">(Dollar)</span>
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full text-sm placeholder:text-[#B2B5B8]"
                name="price"
                {...register("price", {
                  required: "Price is required",
                })}
                placeholder="Ex: 150"
              />
              {errors.price && (
                <span className="text-red-400 text-xs">
                  {errors.price.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Sponsored
              </p>
              <SelectControl
                options={["Yes", "No"]}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="sponsored"
                errorLabel="Sponsored"
              />
              {errors.sponsored && (
                <span className="text-red-400 text-xs">
                  {errors.sponsored.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Index
              </p>
              <SelectControl
                options={["Yes", "No"]}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="indexed"
                errorLabel="Index"
              />
              {errors.indexed && (
                <span className="text-red-400 text-xs">
                  {errors.indexed.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Do follow
              </p>
              <SelectControl
                options={["Yes", "No"]}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="doFollow"
                errorLabel="Sponsored"
              />
              {errors.doFollow && (
                <span className="text-red-400 text-xs">
                  {errors.doFollow.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Region
              </p>
              <div className="relative">
                <select
                  name="region"
                  id="region"
                  defaultChecked="US"
                  className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full appearance-none"
                >
                  {countries.map((country) => (
                    <option key={country.code} defaultValue={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                <ArrowDownIcon className="ml-2.5 absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Location
              </p>
              <input
                type="text"
                className="border border-[#B2B5B8] focus:outline focus:outline-[#006AC2] px-3 py-2 font-poppins text-[#171819] w-full text-sm placeholder:text-[#B2B5B8]"
                name="Indexed"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              value="Add Publication"
              className="font-poppins text-white bg-[#002747] px-11 py-3 mt-9 cursor-pointer"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPublication;
