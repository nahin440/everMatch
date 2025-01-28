import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Image from "./Imgage";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";


const img_api = 'f90f7936d8e56b529d327cd4d2c0ce6b';
const img_main_key=`https://api.imgbb.com/1/upload?expiration=600&key=${img_api}`

const CreateBio = () => {
  const { user } = useAuth();
  
  const axiosSecure = useAxios()

  // const [biodata , setBiodata] = useState([])
  const [biodataType, setBiodataType] = useState("");
  // const [date , setDate] = useState('')
  const [date, setDate] = useState(new Date());
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [occupation, setOccupation] = useState("");
  const [race, setRace] = useState("");
  const [division, setDivision] = useState("");
  const [presentdivision, setPresentDivision] = useState("");
  const [partnerWeight, setPartnerWeight] = useState("");

  console.log(biodataType, date);
  

  const divisions = [
    "Dhaka",
    "Chittagong",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];

  
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const profileImage = form.image.value;
    const age = form.age.value;
    const fatherName = form.father.value;
    const motherName = form.mother.value;
    const expectedPartnerHeight = form.partnerHeight.value;
    const expectedPartnerAge = form.partnerAge.value;
    const mobileNumber = form.mobile.value;


    const bioData = {
      name,
      profileImage,
      age,
      fatherName,
      motherName,
      expectedPartnerAge,
      expectedPartnerHeight,
      mobileNumber,
      biodataType,
      date,
      height,
      weight,
      occupation,
      race,
      division,
      presentdivision,
      partnerWeight,
      role: 'user',
      email: user?.email,
      
    };
    console.table(bioData);

    axiosSecure.post('/biodata', bioData)
    .then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} Data is Successfully Saved`,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    })

    form.reset()
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto mt-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create Biodata
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Biodata Type */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Biodata Type
            </label>
            <select
              onChange={(e) => setBiodataType(e.target.value)}
              name="biodataType"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>    

          {/* Date of Birth */}
          <div className="w-full">
  <label className="block text-gray-700 font-semibold mb-2">
    Date of Birth
  </label>
  <div className="w-full border-2 rounded-lg">
    <DatePicker 
      selected={date} 
      onChange={(date) => setDate(date)} 
      required 
      className="w-full border-none px-4 py-2 focus:outline-none" 
    />
  </div>
</div>


          {/* Height */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Height
            </label>
            <select
              onChange={(e) => setHeight(e.target.value)}
              name="height"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Height
              </option>
              {[...Array(25)].map((_, i) => (
                <option key={i} value={`${4 + i / 10}'`}>
                  {4 + i / 10}'
                </option>
              ))}
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Weight
            </label>
            <select
              onChange={(e) => setWeight(e.target.value)}
              name="weight"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Weight
              </option>
              <option value="50-60">50-60</option>
              <option value="60-70">60-70</option>
              <option value="70-80">70-80</option>
              <option value="80-90">80-90</option>
              <option value="90-100">90-100</option>
              <option value="1bove 100">100+</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Occupation */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Occupation
            </label>
            <select
              onChange={(e) => setOccupation(e.target.value)}
              name="occupation"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Occupation
              </option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Business">Business</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Race */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Race
            </label>
            <select
              onChange={(e) => setRace(e.target.value)}
              name="race"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Race
              </option>
              <option value="Fair">Fair</option>
              <option value="Wheatish">Wheatish</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          {/* Parent Information */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Father's Name
            </label>
            <input
              type="text"
              name="father"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* mother */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mother's Name
            </label>
            <input
              type="text"
              name="mother"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Divisions */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Permanent Division
            </label>
            <select
              onChange={(e) => setDivision(e.target.value)}
              name="permanentDivision"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Division
              </option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Present Division
            </label>
            <select
              onChange={(e) => setPresentDivision(e.target.value)}
              name="presentDivision"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Division
              </option>
              {divisions.map((division) => (
                <option key={division} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Partner Information */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Expected Partner Age
            </label>
            <input
              type="number"
              name="partnerAge"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Expected Partner Height
            </label>
            <select
              name="partnerHeight"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Height(feet)
              </option>
              <option value="5.1'-5.4'">5.1-5.4</option>
              <option value="5.5-5.7">5.5-5.7</option>
              <option value="5.8-6.2">5.8-6.2</option>
              <option value="6.3-6.7">6.3-6.7</option>
              <option value="4.1-4.5">4.1-4.5</option>
              <option value="4.6-5">4.6-5</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Expected Partner Weight
            </label>
            <select
              onChange={(e) => setPartnerWeight(e.target.value)}
              name="expectedPartnerWeight"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="" disabled>
                Select Weight
              </option>
              <option value="50-60">50-60</option>
              <option value="60-70">60-70</option>
              <option value="70-80">70-80</option>
              <option value="80-90">80-90</option>
              <option value="90-100">90-100</option>
              <option value="1bove 100">100+</option>
            </select>
          </div>

          {/* Contact Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              readOnly
              defaultValue={user?.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
         
             
          {/* Profile Image */}
         <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Profile Image Link
            </label>
            <input
              type="text"
              name="image"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div> 
            {/* <Image  className={'w-full'}></Image> */}
         
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
        Publish Now
        </button>
      </form>
    </div>
  );
};

export default CreateBio;
