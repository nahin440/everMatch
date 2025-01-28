import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useBiodata from "../../Hooks/useBiodata";

const Editbio = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [gender, setGender] = useState("");
  const [date, setDate] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState("");
  const [occupation, setOccupation] = useState("");
  const [race, setRace] = useState("");
  const [division, setDivision] = useState("");
  const [presentdivision, setPresentDivision] = useState("");
  const [partnerWeight, setPartnerWeight] = useState("");

  const { id } = useParams();
  // console.log(id);
  const navigate = useNavigate();

  const [biodata] = useBiodata([]) || [];
  const favourate = biodata.find((bio) => bio?._id == id);

  // const  {name,image,age,father,mother,partnerAge,partnerHeight,mobile,gender,date,height,weight,occupation,race,division,presentdivision,partnerWeight,role,email} = favourate

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
    const image = form.image.value;
    const age = form.age.value;
    const father = form.father.value;
    const mother = form.mother.value;
    const partnerHeight = form.partnerHeight.value;
    const partnerAge = form.partnerAge.value;
    const mobile = form.mobile.value;

    const updateData = {
      name,
      image,
      age,
      father,
      mother,
      partnerAge,
      partnerHeight,
      mobile,
      gender,
      date,
      height,
      weight,
      occupation,
      race,
      division,
      presentdivision,
      partnerWeight,
      role: "user",
      email: user?.email,
    };

    axiosSecure.put(`/biodata/${id}`, updateData).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} Modified Item`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/mybio");
      }
    });
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
              onChange={(e) => setGender(e.target.value)}
              name="biodataType"
              required
              defaultValue={favourate?.gender || ""}
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
              defaultValue={favourate?.name}
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
                defaultValue={favourate?.date}
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
            {favourate?.height && (
              <select
                onChange={(e) => setHeight(e.target.value)}
                name="height"
                required
                defaultValue={favourate?.height || ""}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="" disabled>
                  Select Height
                </option>
                <option value="4.5-4.7">4.5-4.7</option>
                <option value="4.8-5.0">4.8-5.0</option>
                <option value="5.1-5.3">5.1-5.3</option>
                <option value="5.4-5.7">5.4-5.7</option>
                <option value="5.8-5.9">5.8-5.9</option>
                <option value="6+">6+</option>
              </select>
            )}
          </div>

          {/* Weight */}
          {favourate?.weight && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Weight
              </label>
              <select
                onChange={(e) => setWeight(e.target.value)}
                name="weight"
                defaultValue={favourate?.weight}
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
          )}

          {/* Age */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Age
            </label>
            <input
              type="number"
              name="age"
              defaultValue={favourate?.age}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Occupation */}
          {favourate?.occupation && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Occupation
              </label>
              <select
                onChange={(e) => setOccupation(e.target.value)}
                name="occupation"
                defaultValue={favourate?.occupation}
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
          )}

          {/* Race */}
          {favourate?.race && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Race
              </label>
              <select
                onChange={(e) => setRace(e.target.value)}
                name="race"
                defaultValue={favourate?.race}
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
          )}

          {/* Parent Information */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Father's Name
            </label>
            <input
              type="text"
              name="father"
              defaultValue={favourate?.father}
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
              defaultValue={favourate?.mother}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Divisions */}
          {favourate?.division && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Permanent Division
              </label>
              <select
                onChange={(e) => setDivision(e.target.value)}
                name="permanentDivision"
                defaultValue={favourate?.division}
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
          )}

          {favourate?.presentdivision && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Present Division
              </label>
              <select
                onChange={(e) => setPresentDivision(e.target.value)}
                name="presentDivision"
                defaultValue={favourate?.presentdivision}
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
          )}

          {/* Expected Partner Information */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Expected Partner Age
            </label>
            <input
              type="number"
              name="partnerAge"
              defaultValue={favourate?.partnerAge}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          {favourate?.partnerHeight && (
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Expected Partner Height
              </label>
              <select
                name="partnerHeight"
                defaultValue={favourate?.partnerHeight}
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
          )}

          {favourate?.partnerWeight && (
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
          )}

          {/* Contact Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              readOnly
              defaultValue={favourate?.email}
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
              defaultValue={favourate?.mobile}
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
              defaultValue={favourate?.image}
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
          Save Biodata
        </button>
      </form>
    </div>
  );
};

export default Editbio;
