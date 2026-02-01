import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddPublicationMutation } from "../../../../redux/api/publicationApi";
import { AddImageIcon, LoadingIcon } from "../../../../utils/icons";
import MultiSelectToken from "../../../ui/MultiSelectToken/MultiSelectToken";
import SelectControl from "../../../ui/SelectControl/SelectControl";
import { useAddNicheMutation } from "../../../../redux/api/nicheApi";
import { useAddGenreMutation, useGenreQuery } from '../../../../redux/api/genreApi';
import { useApiData } from '../../../common/useapiData';
import { useAddIndexedMutation } from '../../../../redux/api/indexedApi';
import { useAddSponsorMutation } from '../../../../redux/api/sponsoreApi';
import { useAddDofollowMutation } from '../../../../redux/api/dofollowApi';
import toast from 'react-hot-toast';
import SelectRegionData from '../../../ui/SelectRegionData/SelectRegionData';
import { City, Country, State } from "country-state-city";
import { useAddCountryMutation } from "../../../../redux/api/country";
import { useAddStateMutation } from "../../../../redux/api/state";
import { useAddCityMutation } from "../../../../redux/api/city";
import MultiSelectTokenControl from "../../../ui/MultiSelectControl/MultiSelectTokenControl";

const AddPublication = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isResetValue, setIsResetValue] = useState(false);
  const [niches, setNiches] = useState([])
  const [fieldsData, setFieldsData] = useState({country:[],state:[],city:[]});
  const [isImgRequired, setIsImgRequired] = useState(false);
  const { nichesData, genresData, indexesData, sponsorsData, dofollowData, countries,states,cities } = useApiData()

  const [addNiche, { isLoading: addNicheLoading }] = useAddNicheMutation()
  const [addGenre, { isLoading: addGenreLoading }] = useAddGenreMutation()
  const [addIndexed, { isLoading: addIndexLoading }] = useAddIndexedMutation()
  const [addSponsor, { isLoading: addSponsorLoading }] = useAddSponsorMutation()
  const [addDofollow, { isLoading: addDofollowLoading }] = useAddDofollowMutation()
  const [addCountry, { isLoading: addCountryLoading }] = useAddCountryMutation()
  const [addState, { isLoading: addStateLoading }] = useAddStateMutation()
  const [addCity, { isLoading: addCityLoading }] = useAddCityMutation()

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  const [addPublication, { isLoading }] = useAddPublicationMutation();

  const onSubmit = async (d) => {
    const obj = { ...d };
    console.log(d);
    const logo = obj["logo"];
    const publicationData = { ...obj };
    delete publicationData["logo"];
    const publicationStr = JSON.stringify(publicationData);
    const formData = new FormData();
    formData.append("file", logo);
    formData.append("data", publicationStr);

    if (logo?.name) {
      setIsImgRequired(false)
      if (formData) {
        try {
          const response = await addPublication(formData);
          if (response?.data?.id) {
            toast.success('Publication added successfully!');
            setImagePreview(null)
            setIsResetValue(true)
          }
          reset()
          console.log("reset : ",reset());
          setFieldsData({country:[],state:[],city:[]});
          setNiches([])
        } catch (err) {
          console.error("Submission failed:", err);
          toast.error("Failed to add publication");
          setImagePreview(null)
        }

      }
    } else {
      setIsImgRequired(true)
    }
    setIsResetValue(false)
  };

  const handleAddNiche = async (val) => {
    try {
      await addNiche({ title: val })
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue('logo', file)
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
                  className="h-full w-full object-contain"
                  src={`${imagePreview}`}
                  alt=""

                />}
              {!imagePreview && (
                <AddImageIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
            <input
              className="hidden"
              onChange={(e) => {
                handleImageChange(e)
              }}
              type="file"
              accept="image/*"
              id="publicationLogo"
            />
          </label>

        </div>
        {isImgRequired && (
          <span className="text-red-400 text-xs">
            Logo is required
          </span>
        )}
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
                {...register("niches")}
                options={nichesData?.niches || []}
                placeholder='Ex: Health'
                onChange={(value) => {
                  setNiches(value);
                  setValue("niches", value);
                }}
                onAddNiche={(v) => handleAddNiche(v)}
                isLoading={addNicheLoading}
              />
              <input
                type="hidden"
                {...register("niches")}
                value={niches}
              />
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
                key={isResetValue}
                options={genresData?.genres || []}
                label="Option"
                register={register}
                isResetValue={isResetValue}
                useQuery={useGenreQuery}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="genre"
                errorLabel="Genre"
                onAddOption={(v) => addGenre({ title: v })}
                isLoading={addGenreLoading}
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
                key={isResetValue}
                options={sponsorsData?.sponsors || []}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                isResetValue={isResetValue}
                setValue={setValue}
                name="sponsor"
                errorLabel="Sponsored"
                onAddOption={(v) => addSponsor({ title: v })}
                isLoading={addSponsorLoading}
              />
              {errors.sponsor && (
                <span className="text-red-400 text-xs">
                  {errors.sponsor.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Index
              </p>
              <SelectControl
                key={isResetValue}
                options={indexesData?.indexes || []}
                label="Option"
                register={register}
                inputType="radio"
                placeholder="Ex: Yes"
                isResetValue={isResetValue}
                setValue={setValue}
                name="index"
                errorLabel="Index"
                onAddOption={(v) => addIndexed({ title: v })}
                isLoading={addIndexLoading}
              />
              {errors.index && (
                <span className="text-red-400 text-xs">
                  {errors.index.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Do follow
              </p>
              <SelectControl
                key={isResetValue}
                options={dofollowData?.dofollows || []}
                label="Option"
                register={register}
                inputType="radio"
                isResetValue={isResetValue}
                placeholder="Ex: Yes"
                setValue={setValue}
                name="doFollow"
                errorLabel="Sponsored"
                onAddOption={(v) => addDofollow({ title: v })}
                isLoading={addDofollowLoading}
              />
              {errors.doFollow && (
                <span className="text-red-400 text-xs">
                  {errors.doFollow.message}
                </span>
              )}
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Scope
              </p>
              <div className="relative">
                <SelectRegionData
                  name="scope"
                  label="Option"
                  setValue={setValue}
                  register={register}
                  placeholder="Ex: Local"
                  options={[{name:'local'}, {name:'national'}, {name:'regional'}, {name:'global'}]}
                />
                {errors.region && (
                  <span className="text-red-400 text-xs">
                    {errors.region.message}
                  </span>
                )}
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                Country
              </p>
              <MultiSelectTokenControl
                value={fieldsData?.country || []}
                key={JSON.stringify(fieldsData)}
                {...register("countries")}
                options={countries?.countries || []}
                isShowSearch={true}
                placeholder='Ex: United States'
                label="Country"
                onChange={(value) => {
                  setFieldsData({...fieldsData, country: value});
                  setValue("countries", value)
                }}
                isLoading={addCountryLoading}
                onAdd={async (v) => await addCountry({ name: v })}
              />
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                State
              </p>
              <div className="relative">
                <MultiSelectTokenControl
                  value={fieldsData?.state || []}
                  key={JSON.stringify(fieldsData)}
                  {...register("states")}
                  options={states?.states || []}
                  isShowSearch={true}
                  placeholder='Ex: New York'
                  label="Country"
                  onChange={(value) => {
                    setFieldsData({ ...fieldsData, state: value });
                    setValue("states", value)
                  }}
                  isLoading={addStateLoading}
                  onAdd={async (v) => await addState({ name: v })}
                />
              </div>
            </label>
            <label htmlFor="">
              <p className="font-glare text-[#5F6368] font-normal tracking-[-0.1px] mb-1.5">
                City
              </p>
              <div className="relative">
                <MultiSelectTokenControl
                  value={fieldsData?.city || []}
                  key={JSON.stringify(fieldsData)}
                  {...register("cities")}
                  options={cities?.cities || []}
                  isShowSearch={true}
                  placeholder='Ex: Adams'
                  label="Country"
                  onChange={(value) => {
                    setFieldsData({ ...fieldsData, city: value });
                    setValue("cities", value)
                  }}
                  isLoading={addCityLoading}
                  onAdd={async (v) => await addCity({ name: v })}
                />
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
                placeholder='Ex: 1234 Mockingbird Lane, Austin, TX 78701, USA'
                {...register("location")}
              />
              {errors.location && (
                <span className="text-red-400 text-xs">
                  {errors.location.message}
                </span>
              )}
            </label>

          </div>
          <div className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className={`font-poppins text-white  px-11 py-3 mt-9 cursor-pointer flex  items-center gap-2 bg-[#295d88] ${isLoading ? 'bg-[#295d88]' : 'bg-[#002747]'}`}
            >
              Add Publication
              {isLoading && <LoadingIcon fill='#fff' style={{ height: "20px" }} />}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPublication;
