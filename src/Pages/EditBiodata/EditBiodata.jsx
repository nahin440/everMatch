import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import UseAuth from "../../Hooks/UseAuth";

const EditBiodata = () => {

    const { user } = UseAuth()
    const [biodata, setBiodata] = useState(null);
    const [loading, setLoading] = useState(true);


    const divisions = [
        "Dhaka",
        "Chattagra",
        "Rangpur",
        "Barisal",
        "Khulna",
        "Mymensingh",
        "Sylhet",
    ];

    useEffect(() => {
        const fetchUserBiodata = async () => {
            try {
                const response = await axios.get("http://localhost:5000/biodata");
                const userBiodata = response.data.find(
                    (item) => item.ContactEmail === user?.email
                );

                if (userBiodata) {
                    setBiodata(userBiodata);
                }
            } catch (error) {
                console.error("Error fetching biodata:", error);
                Swal.fire("Error", "Failed to fetch biodata. Please try again.", "error");
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUserBiodata();
        }
    }, [user?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBiodata({ ...biodata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...biodata,
            ContactEmail: user?.email, // Ensure email is part of the payload
        };

        try {
            if (biodata && biodata._id) {
                // Update existing biodata
                await axios.put(`http://localhost:5000/biodata/${biodata._id}`, payload);
                Swal.fire("Success", "Biodata updated successfully.", "success");
            } else {
                // Create a new biodata
                await axios.post("http://localhost:5000/biodata", payload);
                Swal.fire("Success", "Biodata created successfully.", "success");
            }
        } catch (error) {
            console.error("Error saving biodata:", error);
            Swal.fire("Error", "Failed to save biodata. Please try again.", "error");
        }
    };

    if (loading) {
        return <p>Loading biodata...</p>;
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Edit Biodata</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 bg-white p-6 shadow rounded-xl"
            >
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={biodata?.Name || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Biodata Type */}
                <div>
                    <label className="block text-sm font-medium">Biodata Type</label>
                    <select
                        name="BiodataType"
                        value={biodata?.BiodataType || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block text-sm font-medium">Profile Image URL</label>
                    <input
                        type="text"
                        name="ProfileImage"
                        value={biodata?.ProfileImage || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-sm font-medium">Date of Birth</label>
                    <input
                        type="date"
                        name="DateOfBirth"
                        value={biodata?.DateOfBirth || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Height */}
                <div>
                    <label className="block text-sm font-medium">Height</label>
                    <input
                        type="text"
                        name="Height"
                        value={biodata?.Height || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Weight */}
                <div>
                    <label className="block text-sm font-medium">Weight</label>
                    <input
                        type="text"
                        name="Weight"
                        value={biodata?.Weight || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Occupation */}
                <div>
                    <label className="block text-sm font-medium">Occupation</label>
                    <input
                        type="text"
                        name="Occupation"
                        value={biodata?.Occupation || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Race */}
                <div>
                    <label className="block text-sm font-medium">Race</label>
                    <input
                        type="text"
                        name="Race"
                        value={biodata?.Race || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Fathers Name */}
                <div>
                    <label className="block text-sm font-medium">Father's Name</label>
                    <input
                        type="text"
                        name="FathersName"
                        value={biodata?.FathersName || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Permanent Division */}
                <div>
                    <label className="block text-sm font-medium">Permanent Division</label>
                    <select
                        name="PermanentDivision"
                        value={biodata?.PermanentDivision || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select</option>
                        {divisions.map((division) => (
                            <option key={division} value={division}>
                                {division}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Other fields */}

                {/* Mother's Name */}
                <div>
                    <label className="block text-sm font-medium">Mother's Name</label>
                    <input
                        type="text"
                        name="MothersName"
                        value={biodata?.MothersName || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Present Division */}
                <div>
                    <label className="block text-sm font-medium">Present Division</label>
                    <select
                        name="PresentDivision"
                        value={biodata?.PresentDivision || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    >
                        <option value="">Select</option>
                        {divisions.map((division) => (
                            <option key={division} value={division}>
                                {division}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Expected Partner Age */}
                <div>
                    <label className="block text-sm font-medium">Expected Partner Age</label>
                    <input
                        type="text"
                        name="ExpectedPartnerAge"
                        value={biodata?.ExpectedPartnerAge || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Expected Partner Height */}
                <div>
                    <label className="block text-sm font-medium">Expected Partner Height</label>
                    <input
                        type="text"
                        name="ExpectedPartnerHeight"
                        value={biodata?.ExpectedPartnerHeight || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Expected Partner Weight */}
                <div>
                    <label className="block text-sm font-medium">Expected Partner Weight</label>
                    <input
                        type="text"
                        name="ExpectedPartnerWeight"
                        value={biodata?.ExpectedPartnerWeight || ""}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Mobile Number */}
                <div>
                    <label className="block text-sm font-medium">Mobile Number</label>
                    <input
                        type="tel"
                        name="MobileNumber"
                        value={biodata?.MobileNumber || ""}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Repeat similar pattern for other fields */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default EditBiodata;














