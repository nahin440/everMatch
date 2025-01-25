import { useState, useEffect } from 'react';
import axios from 'axios';
import UseAuth from '../../Hooks/UseAuth';

const EditBiodata = () => {

    const { user } = UseAuth()

    const [biodata, setBiodata] = useState({
        BiodataType: "",
        Name: "",
        ProfileImage: "",
        DateOfBirth: "",
        Height: "",
        Weight: "",
        Age: "",
        Occupation: "",
        Race: "",
        FathersName: "",
        MothersName: "",
        PermanentDivision: "",
        PresentDivision: "",
        ExpectedPartnerAge: "",
        ExpectedPartnerHeight: "",
        ExpectedPartnerWeight: "",
        ContactEmail: user?.email || "",
        MobileNumber: "",
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const response = await axios.get(`/biodata?email=${user?.email}`);
                if (response.data.length > 0) {
                    setBiodata(response.data[0]);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error("Error fetching biodata:", error);
            }
        };

        if (user?.email) {
            fetchBiodata();
        }
    }, [user?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBiodata({ ...biodata, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditing) {
                await axios.put(`/biodata/${biodata._id}`, biodata);
                alert("Biodata updated successfully!");
            } else {
                const response = await axios.post('/biodata', biodata);
                setBiodata(response.data);
                setIsEditing(true);
                alert("Biodata created successfully!");
            }
        } catch (error) {
            console.error("Error saving biodata:", error);
            alert("Failed to save biodata. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Biodata" : "Create Biodata"}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div>
                    <label>Biodata Type</label>
                    <select
                        name="BiodataType"
                        value={biodata.BiodataType}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="Name"
                        value={biodata.Name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Profile Image Link</label>
                    <input
                        type="text"
                        name="ProfileImage"
                        value={biodata.ProfileImage}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        name="DateOfBirth"
                        value={biodata.DateOfBirth}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Height</label>
                    <input
                        type="text"
                        name="Height"
                        value={biodata.Height}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Weight</label>
                    <input
                        type="text"
                        name="Weight"
                        value={biodata.Weight}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input
                        type="number"
                        name="Age"
                        value={biodata.Age}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Occupation</label>
                    <select
                        name="Occupation"
                        value={biodata.Occupation}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Business">Business</option>
                    </select>
                </div>
                <div>
                    <label>Race</label>
                    <input
                        type="text"
                        name="Race"
                        value={biodata.Race}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Father's Name</label>
                    <input
                        type="text"
                        name="FathersName"
                        value={biodata.FathersName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Mother's Name</label>
                    <input
                        type="text"
                        name="MothersName"
                        value={biodata.MothersName}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Permanent Division</label>
                    <select
                        name="PermanentDivision"
                        value={biodata.PermanentDivision}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
                <div>
                    <label>Present Division</label>
                    <select
                        name="PresentDivision"
                        value={biodata.PresentDivision}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    >
                        <option value="">Select</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chittagong">Chittagong</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </select>
                </div>
                <div>
                    <label>Expected Partner Age</label>
                    <input
                        type="text"
                        name="ExpectedPartnerAge"
                        value={biodata.ExpectedPartnerAge}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Expected Partner Height</label>
                    <input
                        type="text"
                        name="ExpectedPartnerHeight"
                        value={biodata.ExpectedPartnerHeight}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Expected Partner Weight</label>
                    <input
                        type="text"
                        name="ExpectedPartnerWeight"
                        value={biodata.ExpectedPartnerWeight}
                        onChange={handleChange}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label>Contact Email</label>
                    <input
                        type="email"
                        name="ContactEmail"
                        value={user?.email}
                        readOnly
                        className="w-full border rounded p-2 bg-gray-100"
                    />
                </div>
                <div>
                    <label>Mobile Number</label>
                    <input
                        type="text"
                        name="MobileNumber"
                        value={biodata.MobileNumber}
                        onChange={handleChange}
                        required
                        className="w-full border rounded p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Save and Publish Now
                </button>
            </form>
        </div>
    );
};

export default EditBiodata;
