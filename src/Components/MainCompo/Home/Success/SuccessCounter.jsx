import { FaFemale, FaFileSignature, FaMale } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa6";
import useState from "../../../Hooks/useState";

const SuccessCounter = () => {
  const [state, refetch , isLoading] = useState({}) || {}
  return (
    <div className="bg-gradient-to-r from-violet-200 via-violet-300 to-violet-400   rounded-lg shadow-md py-8 px-6 my-10">
      <h2 className="text-4xl font-bold text-center text-violet-600 mb-10">Our Website Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5  py-3 max-w-6xl mx-auto">
        {/* Total Bio Data */}
        <div className="flex flex-col items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <FaDatabase className="text-6xl text-orange-600 mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-violet-600 mb-2">Total Bio Data</h2>
          <p className="text-3xl font-bold text-pink-500">{state?.biodata}</p>
        </div>

        {/* Total Male Bio Data */}
        <div className="flex flex-col items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <FaMale className="text-6xl text-blue-500 mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-violet-600 mb-2">Total Male Bio Data</h2>
          <p className="text-3xl font-bold text-pink-500">{state?.boys}</p>
        </div>

        {/* Total Female Bio Data */}
        <div className="flex flex-col items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <FaFemale className="text-6xl text-stone-500-500 mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-violet-600 mb-2">Total Female Bio Data</h2>
        <p className="text-3xl font-bold text-pink-500">{state?.girls}</p>
        </div>

        {/* Marriages Completed */}
        <div className="flex flex-col items-center bg-white px-2 py-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-300">
          <FaFileSignature className="text-6xl text-yellow-400 mb-4" />
          <h2 className="text-lg md:text-xl font-semibold text-violet-600 mb-2">Marriages Completed</h2>
          <p className="text-3xl font-bold text-pink-500">{state?.successStory}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessCounter;
