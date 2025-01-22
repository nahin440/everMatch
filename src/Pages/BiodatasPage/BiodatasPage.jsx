import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const BiodatasPage = () => {
    const { user } = UseAuth();
    const [biodatas, setBiodatas] = useState([]);
    const [filteredBiodatas, setFilteredBiodatas] = useState([]);
    const [filters, setFilters] = useState({
        ageRange: [0, 100],
        type: '',
        division: '',
    });
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Toggle for filter sidebar

    const divisions = ['Dhaka', 'Chittagong', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch biodatas using Axios
    useEffect(() => {
        const fetchBiodatas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/biodata'); // Replace with your backend API URL
                setBiodatas(response.data);
                setFilteredBiodatas(response.data.slice(0, 20)); // Display the first 20 by default
            } catch (error) {
                console.error('Error fetching biodatas:', error);
            }
        };

        fetchBiodatas();
    }, []);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAgeChange = (e) => {
        const { name, value } = e.target;
        const updatedRange = [...filters.ageRange];
        updatedRange[name === 'minAge' ? 0 : 1] = Number(value);
        setFilters((prev) => ({
            ...prev,
            ageRange: updatedRange,
        }));
    };

    // Apply filters to biodatas
    useEffect(() => {
        const { ageRange, type, division } = filters;
        const filtered = biodatas.filter((biodata) => {
            return (
                (type === '' || biodata.BiodataType === type) &&
                (division === '' || biodata.PermanentDivision === division) &&
                biodata.Age >= ageRange[0] &&
                biodata.Age <= ageRange[1]
            );
        });
        setFilteredBiodatas(filtered.slice(0, 20)); // Show first 20 results
    }, [filters, biodatas]);

    const handleViewProfile = (id) => {
        navigate(`/biodata/${id}`); // Navigate to private profile page
    };

    const handleFavourite = (biodata) => {
        if(user && user.email){
            // console.log(biodata._id)

            const favouriteBiodata = {
                biodataId: biodata._id,
                email: user.email,
                name: biodata.Name,
                image: biodata.ProfileImage,
                biodataType: biodata.BiodataType,
                age: biodata.Age,
                Occupation: biodata.Occupation,
            }
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please Login to Add to favourite",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
              }).then((result) => {
                if (result.isConfirmed) {
                //   send the user to login page
                navigate('/login',{state : {from : location}})
                }
              });
        }
    };

    return (
        <div className="py-20 mx-5 md:mx-16 lg:mx-24">
            {/* Toggle Filter Button for Small Devices */}
            <button
                className="block md:hidden bg-[#371524] text-white px-4 py-2 rounded mb-4"
                onClick={() => setIsFilterOpen(true)}
            >
                Open Filters
            </button>

            <div className="flex flex-col md:flex-row">
                {/* Filter Sidebar */}
                <aside
                    className={`fixed top-0 left-0 h-full w-64 bg-[#ffffff] px-4 pb-4 pt-16 z-30 transform ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'
                        } transition-transform md:translate-x-0 md:sticky md:top-20`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Filters</h2>
                        <button
                            className="md:hidden text-gray-500"
                            onClick={() => setIsFilterOpen(false)}
                        >
                            ✖
                        </button>
                    </div>

                    {/* Age Filter */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Age Range:</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                name="minAge"
                                value={filters.ageRange[0]}
                                onChange={handleAgeChange}
                                className="border p-2 w-full"
                                placeholder="Min Age"
                            />
                            <input
                                type="number"
                                name="maxAge"
                                value={filters.ageRange[1]}
                                onChange={handleAgeChange}
                                className="border p-2 w-full"
                                placeholder="Max Age"
                            />
                        </div>
                    </div>

                    {/* Biodata Type Filter */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Biodata Type:</label>
                        <select
                            name="type"
                            value={filters.type}
                            onChange={handleFilterChange}
                            className="border p-2 w-full"
                        >
                            <option value="">All</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Division Filter */}
                    <div className="mb-4">
                        <label className="block font-medium mb-2">Division:</label>
                        <select
                            name="division"
                            value={filters.division}
                            onChange={handleFilterChange}
                            className="border p-2 w-full"
                        >
                            <option value="">All</option>
                            {divisions.map((division) => (
                                <option key={division} value={division}>
                                    {division}
                                </option>
                            ))}
                        </select>
                    </div>
                </aside>

                {/* Overlay for Sidebar on Small Screens */}
                {isFilterOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setIsFilterOpen(false)}
                    ></div>
                )}

                {/* Biodata List Section */}
                <main className="flex-1 bg-white/80 p-4">
                    <h2 className="text-xl font-bold mb-4">All Biodatas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredBiodatas.map((biodata) => (
                            <div
                                key={biodata.IndexId}
                                className="border p-4 rounded shadow hover:shadow-lg transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center justify-evenly">
                                        <img
                                            src={biodata.ProfileImage}
                                            alt={biodata.Name}
                                            className="rounded-full h-24 w-24 object-cover mb-4"
                                        />
                                        <p className="text-left">Bio-Data No : {biodata.IndexId}</p>
                                    </div>
                                    <button
                                        onClick={() => handleFavourite(biodata)}
                                        className="text-right text-3xl text-[#212121] hover:text-[#7e3f3f]"
                                    >
                                        <FaHeart />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold mb-4 text-left">{biodata.Name}</h3>
                                <table className="w-full border-collapse border border-gray-300">
                                    <tbody>
                                        <tr className="border">
                                            <td className="px-2 py-1 font-medium border border-gray-300">ID</td>
                                            <td className="px-2 py-1 border border-gray-300">{biodata.IndexId}</td>
                                        </tr>
                                        <tr className="border">
                                            <td className="px-2 py-1 font-medium border border-gray-300">Type</td>
                                            <td className="px-2 py-1 border border-gray-300">{biodata.BiodataType}</td>
                                        </tr>
                                        <tr className="border">
                                            <td className="px-2 py-1 font-medium border border-gray-300">Division</td>
                                            <td className="px-2 py-1 border border-gray-300">{biodata.PermanentDivision}</td>
                                        </tr>
                                        <tr className="border">
                                            <td className="px-2 py-1 font-medium border border-gray-300">Age</td>
                                            <td className="px-2 py-1 border border-gray-300">{biodata.Age}</td>
                                        </tr>
                                        <tr className="border">
                                            <td className="px-2 py-1 font-medium border border-gray-300">Occupation</td>
                                            <td className="px-2 py-1 border border-gray-300">{biodata.Occupation}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button
                                    onClick={() => handleViewProfile(biodata.IndexId)}
                                    className="bg-[#371524] text-white px-4 py-2 rounded mt-4 w-full"
                                >
                                    View Profile
                                </button>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BiodatasPage;
