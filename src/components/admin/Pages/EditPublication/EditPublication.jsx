import { useEffect, useState } from "react";
import countries from "../../../../assets/countries.json";
import { AddImageIcon, ArrowDownIcon, LoadingIcon } from "../../../../utils/icons";
import MultiSelectToken from "../../../ui/MultiSelectToken/MultiSelectToken";
import SelectControl from "../../../ui/SelectControl/SelectControl";
import { RxCross2 } from "react-icons/rx";
import { useAddNicheMutation } from '../../../../redux/api/nicheApi';
import { useAddGenreMutation, useGenreQuery } from '../../../../redux/api/genreApi';
import { useAddIndexedMutation } from '../../../../redux/api/indexedApi';
import { useAddSponsorMutation } from '../../../../redux/api/sponsoreApi';
import { useAddDofollowMutation } from '../../../../redux/api/dofollowApi';
import { useApiData } from '../../../common/useapiData';
import { usePublicationQuery, useUpdatePublicationMutation } from '../../../../redux/api/publicationApi';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
const EditPublication = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const { id } = useParams();

  const [imagePreview, setImagePreview] = useState(null);
  const [niches, setNiches] = useState([])

  const { nichesData, genresData, indexesData, sponsorsData, dofollowData } = useApiData()

  const [addNiche, { isLoading: addNicheLoading }] = useAddNicheMutation()
  const [addGenre, { isLoading: addGenreLoading }] = useAddGenreMutation()
  const [addIndexed, { isLoading: addIndexLoading }] = useAddIndexedMutation()
  const [addSponsor, { isLoading: addSponsorLoading }] = useAddSponsorMutation()
  const [addDofollow, { isLoading: addDofollowLoading }] = useAddDofollowMutation()

  const { data: singlePublication, isLoading: singlePublicationLoading } = usePublicationQuery(id);


  useEffect(() => {
    setNiches(nichesData?.niches?.map(niche => niche.id));
  }, [singlePublicationLoading, nichesData?.niches]);

  const {
    register,
    handleSubmit,
    formState: { errors }, setValue,
  } = useForm();

  const [updatePublication, {isLoading}] = useUpdatePublicationMutation();



  const onSubmit = async (d) => {
    const obj = { ...d };
    const logo = obj["logo"];
    const publicationData = { ...obj };
    delete publicationData["logo"];
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
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        await updatePublication({ id, body: formData });
        toast.success("Publication updated successfully");
      } catch (err) {
        // console.error(err.message);
        toast.error(err.message);
      }

    }
  }


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
        <div className="flex items-center justify-between mb-3">
          <p className="font-glare text-[#5F6368] text-[20px] tracking-[-0.1px]">
            Publication Logo
          </p>
          <p
            className="bg-[#F6F7F7] px-4 py-2.5 rounded-3xl text-[#5F6368] text-sm flex items-center justify-center cursor-pointer gap-1.5"
            onClick={() => setIsDisabled(!isDisabled)}
          >
            Edit
            {!isDisabled ? (
              <RxCross2 className="text-[#5F6368] text-[16px]" />
            ) : null}
          </p>
        </div>
        {/* Logo */}
        {/* Logo */}
        <div className="h-[150px] w-[150px]">
          <label htmlFor="publicationLogo">
            <div className="h-[150px] w-[150px] bg-[#E6E6E6] relative cursor-pointer ">
              {(imagePreview || singlePublication?.logo) &&
                <img
                  className="h-full w-full object-cover"
                  src={`${imagePreview || singlePublication?.logo}`}
                  alt=""

                />}
              {!(imagePreview || singlePublication?.logo) && (
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
              {...register("title")}
              placeholder="Type publication name"
              defaultValue={singlePublication?.title}
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
                {...register("da")}
                defaultValue={singlePublication?.da}
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
                {...register("dr")}
                defaultValue={singlePublication?.dr}
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
                {...register("ttp")}
                defaultValue={singlePublication?.ttp}
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
                key={singlePublicationLoading}
                options={genresData?.genres || []}
                label="Option"
                isNotRequired={false}
                register={register}
                useQuery={useGenreQuery}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="genreId"
                errorLabel="Genre"
                value={singlePublication?.genre}
                onAddOption={(v) => addGenre({ title: v })}
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
                {...register("price")}
                defaultValue={singlePublication?.price}
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
                key={singlePublicationLoading}
                options={sponsorsData?.sponsors || []}
                label="Option"
                value={singlePublication?.sponsor}
                register={register}
                isNotRequired={false}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="sponsorId"
                errorLabel="Sponsored"
                onAddOption={(v) => addSponsor({ title: v })}
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
                key={singlePublicationLoading}
                options={indexesData?.indexes || []}
                value={singlePublication?.index}
                label="Option"
                register={register}
                isNotRequired={false}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="indexedId"
                errorLabel="Index"
                onAddOption={(v) => addIndexed({ title: v })}
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
                key={singlePublicationLoading}
                options={dofollowData?.dofollows || []}
                value={singlePublication?.doFollow}
                label="Option"
                register={register}
                isNotRequired={false}
                inputType="radio"
                placeholder="Ex: Yes"
                setValue={setValue}
                name="doFollowId"
                errorLabel="Sponsored"
                onAddOption={(v) => addDofollow({ title: v })}
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
                  id="region"
                  {
                  ...register('region')
                  }
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
                {...register("location")}
                defaultValue={singlePublication?.location}
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
              className="font-poppins text-white bg-[#002747] px-11 py-3 mt-9 cursor-pointer flex items-center gap-3"
                        >
              Update
                          {isLoading &&<LoadingIcon fill='#fff' style={{ height: "20px" }} />}
                        </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPublication;
