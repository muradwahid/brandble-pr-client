export default function LocationFilter({ locationRef, onChange = () => { }, scope, data, isLoading, setLocationSearch, locationSearch, filterData }) {

  // const handleApply = () => {
  //   onChange({
  //     // country: countryName,
  //     // states: stateName,
  //     // cities: selectedCities,
  //     // scope: global
  //   });
  //   setIsLocationShow(false);
  // };

  const scopeData = ['local', 'national', 'regional', 'global'];


  return (
    <div ref={locationRef} className="absolute min-w-40  z-30 left-[100%] top-0 steperform-publish-formshadow">
      {/* Main Panel */}
      <div className="flex-1 p-3 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="">
            {/* Country */}
            {scope==="national" && <div className="w-full">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select Country</div>
              <input
                type="text"
                className="mt-0.5 w-full px-2 py-1 border border-[#DCDEDF] text-sm focus:outline-none"
                placeholder="Search Countries..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              <div className="max-h-[300px] overflow-y-auto mt-3">
                {!isLoading ? data?.countries?.filter((country) =>
                  country?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase())
                ).length > 0 ? (
                  data?.countries?.filter((country) =>
                      country?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase())
                    )
                    .map((country,idx) => (
                      <div
                        key={`${country?.name}-${idx}`}
                        onClick={() => onChange({ ...filterData, country: country?.name })}
                        className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${filterData?.country===country?.name ? "bg-[#DCDEDF]" : ""
                          }`}
                      >
                        {country?.name}
                      </div>
                    ))
                ) : (
                  <div className="text-[#5F6368] text-sm text-center py-4">
                      No cities found matching "{locationSearch}"
                  </div>
                ) : <div className='text-[#5F6368] text-sm text-center py-4'>Loading...</div>
                }
              </div>
            </div>}

            {/* State */}
            {scope === 'state' && <div className="w-full">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select State</div>
              <input
                type="text"
                className="mt-0.5 w-full px-2 py-1 border border-[#DCDEDF] text-sm focus:outline-none"
                placeholder="Search States..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              <div className="max-h-[300px] overflow-y-auto mt-3">
                {!isLoading ? data?.states?.filter((state) =>
                  state?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase())
                ).length > 0 ? (
                  data?.states?.filter((state) =>
                      state?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase())
                    )?.map((state,idx) => (
                      <div
                        key={`${state?.name}-${idx}`}
                        onClick={() => onChange({ ...filterData, state: state?.name })}
                        className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${filterData?.state===state?.name ? "bg-[#DCDEDF]" : ""
                          }`}
                      >
                        {state?.name}
                      </div>
                    ))
                ) : (
                  <div className="text-[#5F6368] text-sm text-center py-4">
                      No cities found matching "{locationSearch}"
                  </div>
                ) : <div className='text-[#5F6368] text-sm text-center py-4'>Loading...</div>
                }
              </div>
            </div>}

            {/* City - Multi Select with Checkboxes */}
          {scope==='local'&& <div className="w-full">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select City</div>
              <input
                type="text"
                className="mt-0.5 w-full px-2 py-1 border border-[#DCDEDF] text-sm focus:outline-none"
                placeholder="Search Cities..."
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
              <div className="max-h-[300px] overflow-y-auto mt-3">
                {!isLoading ? data?.cities?.filter((city) => city.name.toLowerCase().includes(locationSearch?.toLowerCase()) )?.length > 0 ? (
                  data?.cities.filter((city) => city?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase()))?.map((city,idx) => (
                      <div
                        key={`${city?.name}-${idx}`}
                        onClick={() =>onChange({ ...filterData, city: city?.name })}
                      className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${filterData?.city ===city?.name ? "bg-[#DCDEDF]" : ""
                          }`}
                      >
                        {city?.name}
                      </div>
                    ))
                ) : (
                  <div className="text-[#5F6368] text-sm text-center py-4">
                      No cities found matching "{locationSearch}"
                  </div>
                ) : <div className='text-[#5F6368] text-sm text-center py-4'>Loading...</div>
              }
              </div>
            </div>}

            {scope === 'scope' && <div className="w-full">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select Scope</div>
              <div className="max-h-[300px] overflow-y-auto mt-3">
                {!isLoading ? data?.cities?.filter((city) => city.name.toLowerCase().includes(locationSearch?.toLowerCase()))?.length > 0 ? (
                  scopeData.map((scopeName, idx) => (
                    <div
                      key={`${scopeName}-${idx}`}
                      onClick={() => onChange({ ...filterData, scope: scopeName })}
                      className={`px-2 mb-0.5 py-1 text-left capitalize text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${filterData?.scope === scopeName ? "bg-[#DCDEDF]" : ""
                        }`}
                    >
                      {scopeName}
                    </div>
                  ))
                ) : (
                  <div className="text-[#5F6368] text-sm text-center py-4">
                    No cities found matching "{locationSearch}"
                  </div>
                ) : <div className='text-[#5F6368] text-sm text-center py-4'>Loading...</div>
                }
              </div>
            </div>
            
            }
          
          </div>

          {/* Apply Button */}
          {/* <div className="mt-8 text-right">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#171819] text-white text-xs rounded-sm font-medium hover:bg-gray-800 transition outline-none cursor-pointer"
            >
              Apply
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}