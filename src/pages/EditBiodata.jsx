import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../components/provider/AuthProvider";

const EditBiodata = () => {
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState({
    biodataType: "",
    name: "",
    profileImage: "",
    dob: "",
    height: "",
    weight: "",
    age: "",
    occupation: "",
    race: "",
    fatherName: "",
    motherName: "",
    permanentDivision: "",
    presentDivision: "",
    expectedPartnerAge: "",
    expectedPartnerHeight: "",
    expectedPartnerWeight: "",
    contactEmail: user?.email, // Read-only
    mobileNumber: "",
  });

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBiodata = async () => {
      try {
        const res = await axios.get(`https://evermatch-server.vercel.app/biodatas/${user?.email}`);
        if (res.data) {
          setBiodata(res.data);
          setIsEdit(true); // User already has biodata
        }
      } catch (error) {
        console.error("Error fetching biodata:", error);
      }
    };
    fetchBiodata();
  }, [user?.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBiodata({ ...biodata, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      Swal.fire({
        icon: "warning",
        title: "No file selected",
        text: "Please select an image to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const imageUrl = res.data.data.url;
        setBiodata((prev) => ({ ...prev, profileImage: imageUrl }));
        Swal.fire({
          icon: "success",
          title: "Image Uploaded",
          text: "Profile image uploaded successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed",
          text: "Failed to upload the image. Please try again.",
        });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Something went wrong while uploading the image.",
      });
    }
  };

  const handleSaveAndPublish = async () => {
    const { biodataId, ...biodataToSave } = biodata; // Exclude the _id field

    try {
      const endpoint = isEdit
        ? `https://evermatch-server.vercel.app/biodatas/${biodataId}`
        : "https://evermatch-server.vercel.app/biodatas";
      const method = isEdit ? "put" : "post";

      const res = await axios[method](endpoint, biodataToSave);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: isEdit
          ? "Biodata updated successfully"
          : `Biodata created with ID: ${res.data.biodataId}`,
      });

      if (!isEdit) {
        setIsEdit(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong! Please try again.",
      });
      console.error("Error saving biodata:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">{isEdit ? "Edit" : "Create"} Biodata</h2>
      <form className="max-w-5xl mx-auto grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <label className="block font-semibold">Biodata Type</label>
          <select
            name="biodataType"
            value={biodata.biodataType}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={biodata.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {biodata.profileImage && (
            <img
              src={biodata.profileImage}
              alt="Profile"
              className="mt-2 w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={biodata.dob}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Height (in cm)</label>
          <input
            type="number"
            name="height"
            value={biodata.height}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Weight (in kg)</label>
          <input
            type="number"
            name="weight"
            value={biodata.weight}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Age</label>
          <input
            type="number"
            name="age"
            value={biodata.age}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Occupation</label>
          <select
            name="occupation"
            value={biodata.occupation}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Student">Student</option>
            <option value="Engineer">Engineer</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Race (Skin Color)</label>
          <input
            type="text"
            name="race"
            value={biodata.race}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            value={biodata.fatherName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            value={biodata.motherName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Permanent Division</label>
          <select
            name="permanentDivision"
            value={biodata.permanentDivision}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Present Division</label>
          <select
            name="presentDivision"
            value={biodata.presentDivision}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select</option>
            <option value="Dhaka">Dhaka</option>
            <option value="Chittagong">Chittagong</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Expected Partner Age</label>
          <input
            type="number"
            name="expectedPartnerAge"
            value={biodata.expectedPartnerAge}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Expected Partner Height (in cm)</label>
          <input
            type="number"
            name="expectedPartnerHeight"
            value={biodata.expectedPartnerHeight}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Expected Partner Weight (in kg)</label>
          <input
            type="number"
            name="expectedPartnerWeight"
            value={biodata.expectedPartnerWeight}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={biodata.contactEmail}
            disabled
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-semibold">Mobile Number</label>
          <input
            type="tel"
            name="mobileNumber"
            value={biodata.mobileNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center">
          <button
            type="button"
            onClick={handleSaveAndPublish}
            className="px-6 py-2 bg-blue-500 text-white rounded-md mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save and Publish Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;

