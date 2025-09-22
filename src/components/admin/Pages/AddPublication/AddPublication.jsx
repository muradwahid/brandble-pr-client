import {  useState } from "react";
import { useForm } from "react-hook-form";
import countries from "../../../../assets/countries.json";
import { useAddPublicationMutation } from "../../../../redux/api/publicationApi";
import { AddImageIcon, ArrowDownIcon } from "../../../../utils/icons";
import MultiSelectToken from "../../../ui/MultiSelectToken/MultiSelectToken";
import SelectControl from "../../../ui/SelectControl/SelectControl";
import { useAddNicheMutation } from "../../../../redux/api/nicheApi";
import { useAddGenreMutation, useGenreQuery } from '../../../../redux/api/genreApi';
import { useApiData } from '../../../common/useapiData';
import { useAddIndexedMutation } from '../../../../redux/api/indexedApi';
import { useAddSponsorMutation } from '../../../../redux/api/sponsoreApi';
import { useAddDofollowMutation } from '../../../../redux/api/dofollowApi';
import toast from 'react-hot-toast';

const AddPublication = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [niches, setNiches] = useState([])

  const { nichesData,genresData,indexesData,sponsorsData,dofollowData } = useApiData()
  
  const [addNiche, { isLoading:addNicheLoading }] = useAddNicheMutation()
  const [addGenre, { isLoading:addGenreLoading }] = useAddGenreMutation()
  const [addIndexed, { isLoading:addIndexLoading }] = useAddIndexedMutation()
  const [addSponsor, { isLoading:addSponsorLoading }] = useAddSponsorMutation()
  const [addDofollow, { isLoading:addDofollowLoading }] = useAddDofollowMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },setValue,
  } = useForm();

  const [addPublication, 
    // { isLoading, isError, error }
  ] =
    useAddPublicationMutation();



  const onSubmit =async (d) => {
    const obj = { ...d };
    const logo = obj["logo"];
    // console.log(logo)
    const publicationData = { ...obj };
    delete publicationData["logo"];
    const publicationStr = JSON.stringify(publicationData);
    const formData = new FormData();
    formData.append("file", logo);
    formData.append("data", publicationStr);
    if (formData) {
      try {
        await addPublication(formData);
        toast.success('Publication added successfully!');
      } catch (err) {
        console.error("Submission failed:", err);
        toast.error("Failed to add publication");
      }
      
    }

    //   try {
    // const response = await fetch('http://localhost:5000/api/v1/publication/create', {
    //   method: 'POST',
    //   body: formData,
    // });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const result = await response.json();
    //     console.log('Success:', result);
    //     alert('Publication added successfully!');
    //   } catch (err) {
    //     console.error('Submission failed:', err);
    //     alert('Failed to add publication');
    //   }
  };

  const handleAddNiche = async (val) => { 
      try {
        await addNiche({title:val})
      } catch (error) {
        console.error(error)
      }
  }

// console.log(sponsorsData,dofollowData,indexesData)

const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('logo',file)
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="border border-[#F2F2F3] p-6 w-4/5 mx-auto singlePublicationAdmin">
        <div>
          <p className="font-glare text-[#5F6368] text-[20px] tracking-[-0.1px]">
            Publication Logo
          </p>
          {/* Logo */}
          <div className="h-[150px] w-[150px]">
            <label htmlFor="publicationLogo">
          <div className="h-[150px] w-[150px] bg-[#E6E6E6] relative cursor-pointer ">
            {imagePreview &&
              <img
                  className="h-full w-full object-cover"
                  src={`${imagePreview}`}
                  alt=""

                />}
              {!imagePreview && (
                <AddImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <input
              className="hidden"
              onChange={(e) =>{
                handleImageChange(e)}}
              type="file"
              accept="image/*"
              id="publicationLogo"
            />
            </label>

          </div>
        </div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register("niches", {
                  required: "Niche are required",
                })}
                options={nichesData?.niches || []}
                onChange={(value) => {
                  setNiches(value);
                  setValue("niches",value);
                }}
                onAddNiche={(v) => handleAddNiche(v)}
                isLoading={addNicheLoading}
              />
              <input
                type="hidden"
                {...register("niches", {
                  required: "Niche are required",
                  validate: (value) => {
                    const parsedValue = value ||' []';
                    return parsedValue.length > 0 || "Niche are required";
                  },
                })}
                value={niches}
              />
              {errors.niches && (
                <span className="text-red-400 text-xs">
                  {errors.niches.message}
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
                options={genresData?.genres || []}
                label="Option"
                register={register}
                useQuery={useGenreQuery}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="genreId"
                errorLabel="Genre"
                onAddOption={(v) => addGenre({title:v})}
                isLoading={addGenreLoading}
              />
              {errors.genreId && (
                <span className="text-red-400 text-xs">
                  {errors.genreId.message}
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
                options={sponsorsData?.sponsors || []}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="sponsorId"
                errorLabel="Sponsored"
                onAddOption={(v) => addSponsor({title:v})}
                isLoading={addSponsorLoading}
              />
              {errors.sponsorId && (
                <span className="text-red-400 text-xs">
                  {errors.sponsorId.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Index
              </p>
              <SelectControl
                options={indexesData?.indexes || []}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="indexedId"
                errorLabel="Index"
                onAddOption={(v) => addIndexed({title:v})}
                isLoading={addIndexLoading}
              />
              {errors.indexedId && (
                <span className="text-red-400 text-xs">
                  {errors.indexedId.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Do follow
              </p>
              <SelectControl
                options={dofollowData?.dofollows || []}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="doFollowId"
                errorLabel="Sponsored"
                onAddOption={(v) => addDofollow({title:v})}
                isLoading={addDofollowLoading}
              />
              {errors.doFollowId && (
                <span className="text-red-400 text-xs">
                  {errors.doFollowId.message}
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
                name="location"
                {...register("location", {
                  required: "Location is required",
                })}
              />
              {errors.location && (
                <span className="text-red-400 text-xs">
                  {errors.location.message}
                </span>
              )} 
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
