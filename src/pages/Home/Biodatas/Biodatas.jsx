import React, { useEffect, useState } from 'react';
import BioItem from '../../../Shared/BioItem/BioItem';

const Biodatas = () => {
  const [bio, setBio] = useState([]);
  const [filteredBio, setFilteredBio] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    ageFrom: '',
    ageTo: '',
    biodataType: '',
    division: '',
  });

  useEffect(() => {
    fetch('https://evermatch-server.vercel.app/biodatas')
      .then((res) => res.json())
      .then((data) => {
        setBio(data);
        setFilteredBio(data);
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter the data based on selected filters
  useEffect(() => {
    const { ageFrom, ageTo, biodataType, division } = filters;

    const filteredData = bio.filter((item) => {
      const matchesAge =
        (!ageFrom || item.age >= parseInt(ageFrom)) &&
        (!ageTo || item.age <= parseInt(ageTo));
      const matchesBiodataType = biodataType ? item.biodataType === biodataType : true;
      const matchesDivision = division ? item.division === division : true;
      return matchesAge && matchesBiodataType && matchesDivision;
    });

    setFilteredBio(filteredData);
  }, [filters, bio]);

  return (
    <div className="y-20 mx-5 md:mx-16 lg:mx-24">
      {/* Filter Section */}
      <button
        className="block md:hidden bg-[#371524] text-white px-4 py-2 mt-10 rounded mb-4"
        onClick={() => setIsFilterOpen(true)}
      >
        Open Filters
      </button>

      <div className="flex flex-col md:flex-row" >
        <div className={`fixed top-0 left-0 h-full w-64 bg-[#ffe4f0] px-4 pb-4 pt-16 z-30 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform md:translate-x-0 md:sticky md:top-20`}>
          <h3 className="text-xl font-semibold mb-4">Filter Options</h3>

          {/* Age Range Filter */}
          <div className="mb-4">
            <label htmlFor="ageFrom" className="block font-medium mb-1">
              Age Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                id="ageFrom"
                name="ageFrom"
                value={filters.ageFrom}
                onChange={handleFilterChange}
                className="w-1/2 border rounded px-3 py-2"
                placeholder="From"
              />
              <input
                type="number"
                id="ageTo"
                name="ageTo"
                value={filters.ageTo}
                onChange={handleFilterChange}
                className="w-1/2 border rounded px-3 py-2"
                placeholder="To"
              />
            </div>
          </div>

          {/* Biodata Type Filter */}
          <div className="mb-4">
            <label htmlFor="biodataType" className="block font-medium mb-1">
              Biodata Type
            </label>
            <select
              id="biodataType"
              name="biodataType"
              value={filters.biodataType}
              onChange={handleFilterChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Division Filter */}
          <div className="mb-4">
            <label htmlFor="division" className="block font-medium mb-1">
              Division
            </label>
            <select
              id="division"
              name="division"
              value={filters.division}
              onChange={handleFilterChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
        </div>

        {isFilterOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          ></div>
        )}

        {/* Biodata Section */}
        <div className="w-11/12 md:w-9/12 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredBio.map((item) => (
              <BioItem key={item._id} item={item}></BioItem>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Biodatas;