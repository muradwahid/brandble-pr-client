// src/components/LocationFilter.tsx
import React, { useState, useMemo } from 'react';
import { Country, State, City } from 'country-state-city';

export default function LocationFilter({ onChange = () => { }, setIsLocationShow = () => { },scope }) {

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCities, setSelectedCities] = useState('');
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState('');

  const [countrySearch, setCountrySearch] = useState('');

  // Load all countries 
  const countries = useMemo(() => Country.getAllCountries(), []);

  // Load states when country changes
  const states = useMemo(() => {
    return selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  }, [selectedCountry]);

  // Load cities when state changes
  const cities = useMemo(() => {
    return selectedCountry && selectedState
      ? City.getCitiesOfState(selectedCountry,selectedState)
      : [];
  }, [selectedCountry, selectedState]);

  // Filtered lists
  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );


  const handleApply = () => {
    onChange({
      scope,
      region: countryName,
      state: stateName,
      cities: selectedCities,
    });
    setIsLocationShow(false);
  };
  return (
    <div className="absolute w-[550px] z-30 left-[100%] top-0 steperform-publish-formshadow">
      {/* Main Panel */}
      <div className="flex-1 p-3 bg-white">
        <div className="max-w-xl mx-auto">
          <div className="grid grid-cols-3 gap-6">
            {/* Country */}
            <div className="border-r border-[#B2B5B8] pr-1">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select Country</div>
              <div className="py-3">
                <input
                  type="text"
                  placeholder="Search ..."
                  className="w-full px-2 py-1 border border-[#DCDEDF] focus:outline-none"
                  value={countrySearch}
                  onChange={e => setCountrySearch(e.target.value)}
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredCountries.map(country => (
                  <div
                    key={country.isoCode}
                    onClick={() => {
                      setSelectedCountry(country.isoCode);
                      setSelectedState('');
                      setSelectedCities('');
                      setCountrySearch('');
                      setCountryName(country.name);
                    }}
                    className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${selectedCountry === country.isoCode ? 'bg-[#DCDEDF]' : ''
                      }`}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>

            {/* State */}
            <div className="border-r border-[#B2B5B8] pr-1">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select State</div>
              <div className="max-h-[430px] overflow-y-auto mt-3">
                {states.length === 0 ? (
                  <div className="px-4 py-8 text-gray-400">
                    {selectedCountry ? 'No states' : 'Select a country first'}
                  </div>
                ) : (
                  states.map(state => (
                    <div
                      key={state.name}
                      onClick={() => {
                        setSelectedState(state.isoCode);
                        setSelectedCities('');
                        setStateName(state.name);
                      }}
                      className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${selectedState === state.isoCode ? 'bg-[#DCDEDF]' : ''
                        }`}
                    >
                      {state.name}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* City - Multi Select with Checkboxes */}
            <div className="border-r border-[#B2B5B8] pr-1">
              <div className="pb-2 border-b border-[#B2B5B8] text-[#5F6368] text-sm text-left">Select City</div>
              <div className="max-h-[430px] overflow-y-auto mt-3">
                {cities.length === 0 ? (
                  <div className="px-4 py-8 text-gray-400">
                    {selectedState ? 'No cities' : 'Select state first'}
                  </div>
                ) : (
                  cities.map((city) => (
                    <div key={city.name}
                      onClick={() => {
                        setSelectedCities(city.name)
                      }}
                      className={`px-2 mb-0.5 py-1 text-left text-[#5F6368] text-sm cursor-pointer hover:bg-[#DCDEDF] ${selectedCities === city.name ? 'bg-[#DCDEDF]' : ''
                        }`}>{city.name}</div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mt-8 text-right">
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-[#171819] text-white rounded-sm font-medium hover:bg-gray-800 transition outline-none cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}