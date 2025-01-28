import Card from "./Card";
import { Select, Option } from "@material-tailwind/react";
import useBiodata from "../../Hooks/useBiodata";
import { useEffect, useState } from "react";

const Biodata = () => {
  const divisions = [
    "Dhaka",
    "Chittagong",
    "Rangpur",
    "Barisal",
    "Khulna",
    "Mymensingh",
    "Sylhet",
  ];
  //  const [biodata , setBiodata] = useBiodata() || []
  const [biodata, setBiodata] = useState([]);
  //  const [age , setAge] = useState('')
  const [gender, setGnder] = useState("");
  // console.log(gender);
  const [division, setDivision] = useState("");
  // console.log(division);

  useEffect(() => {
    fetch(`http://localhost:5000/biodata?division=${division}&gender=${gender}`)
      //  fetch("biodata.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBiodata(data);
      });
  }, [division, gender]);

  function reset() {
    setDivision("");
    setGnder("");
  }

  function sortBiodata() {
    const sortData = [...biodata].sort((a, b) => a.age - b.age);
    setBiodata(sortData);
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Options</h2>

    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Gender Selection */}


        <div className="flex gap-2 items-center justify-center">
          <div className="w-full sm:w-auto">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>
            <select
              id="gender"
              onChange={(e) => setGnder(e.target.value)}
              name="biodataType"
              required
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>


        {/* Division Selection */}
        <div className="w-full  sm:w-auto">
          <label
            htmlFor="division"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Division
          </label>
          <select
            id="division"
            onChange={(e) => setDivision(e.target.value)}
            name="permanentDivision"
            required
            className="w-full sm:w-auto border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        </div>

        {/* Reset Button */}
   
          
        <div className=" flex flex-col md:flex-row gap-2">
          <button onClick={sortBiodata} className="btn-outline btn border-2 border-violet-500 text-violet-600">
            Sort by Age
          </button>
          
          <button
            onClick={reset}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            Reset All
          </button>

        </div>
       
 

       {/* sort by age  */}

      


    </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {biodata.map((bio, idx) => (
          <Card key={idx} bio={bio}></Card>
        ))}
      </div>
    </div>
  );
};

export default Biodata;