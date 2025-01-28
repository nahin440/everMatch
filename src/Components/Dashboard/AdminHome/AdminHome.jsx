import { FaUsers, FaFemale, FaHistory, FaMale } from "react-icons/fa";
import { BsClipboard2DataFill } from "react-icons/bs";
import { TbCoinFilled } from "react-icons/tb";
import useState from "../../Hooks/useState";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart, Bar, ResponsiveContainer
} from "recharts";

const AdminHome = () => {
  const [state, refetch, isLoading] = useState();
  const { biodata, users, successStory, revinew, boys, girls , premium } = state || {};


  const pieData = [
    { id: 0, value: state?.biodata, label: "Total Bio" },
    { id: 1, value: state?.boys, label: "Male BioData" },
    { id: 2, value: state?.girls, label: "Female BioData" },
    { id: 3, value: state?.revinew, label: "Revenue ($)" },
  ];

  const barData = [
    { name: 'Revenue', uv: state?.revinew },
    { name: 'Users', uv: state?.users },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Reusable Card Component
  const StatCard = ({ icon, title, value, description, gradient }) => {
    return (
      <div
        className={`p-3 rounded-xl shadow-lg bg-gradient-to-br ${gradient} flex flex-col items-center text-white`}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {/* Icon */}
        <div className="text-4xl mb-1">{icon}</div>

        {/* Title */}
        <h3 className="text-lg font-semibold tracking-wide">{title}</h3>

        {/* Value */}
        <p className="text-3xl font-bold my-1">{value || 0}</p>

        {/* Description */}
        <span className="text-sm font-light opacity-80">{description}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="p-4 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Admin Dashboard Overview
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Bio Data */}
            
            <StatCard
              icon={<BsClipboard2DataFill />}
              title="Total Bio Data"
              value={biodata}
              description="Many More Have to Come"
              gradient="from-purple-500 to-pink-500"
              
            />

            {/* Total Users */}
            <StatCard
              icon={<FaUsers />}
              title="Total Users"
              value={users}
              description="Our Happiest Users"
              gradient="from-blue-500 to-cyan-500"
            />

            {/* Male Bio Data */}
            <StatCard
              icon={<FaMale />}
              title="Male Bio Data"
              value={boys}
              description="Make Your Journey Start Here"
              gradient="from-violet-500 to-teal-500"
            />

            {/* Female Bio Data */}
            <StatCard
              icon={<FaFemale />}
              title="Female Bio Data"
              value={girls}
              description="Make Your Journey Start Here"
              gradient="from-pink-500 to-red-500"
            />

            {/* Success Stories */}
            <StatCard
              icon={<FaHistory />}
              title="Successfull story"
              value={successStory}
              description="Happiest Endings"
              gradient="from-yellow-500 to-orange-500"
            />

            {/* Revenue */}
            <StatCard
              icon={<TbCoinFilled />}
              title="Total Revenue"
              value={`$${revinew}`}
              description="From $240.94"
              gradient="from-indigo-500  to-purple-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        {/* pie chart */}
        <div className="flex-1 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Total Chart
            </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* revineww */}
        <div className="flex-1  rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
              Revenue and Users
            </h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
      </div>
    </div>
  );
};

export default AdminHome;
