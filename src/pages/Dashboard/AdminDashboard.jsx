import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useAxiosSecure from "../../hooks/useAxiosSecure";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch total revenue using React Query
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const [biodataCount, setBiodataCount] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [premiumCount, setPremiumCount] = useState(0);

  useEffect(() => {
    // Fetch biodata stats from backend
    fetch("https://evermatch-server.vercel.app/biodatas")
      .then((res) => res.json())
      .then((data) => {
        setBiodataCount(data.length); // Total biodata count
        setMaleCount(data.filter((bio) => bio.biodataType === "Male").length); // Male biodata count
        setFemaleCount(data.filter((bio) => bio.biodataType === "Female").length); // Female biodata count
        setPremiumCount(data.filter((bio) => bio.role === "premium").length); // Premium biodata count
      })
      .catch((error) => console.error("Error fetching biodata:", error));
  }, []);

  // Prepare data for the Pie Chart
  const pieData = {
    labels: ["Total Biodata", "Male Biodata", "Female Biodata", "Premium Biodata", "Revenue"],
    datasets: [
      {
        label: "Admin Dashboard Statistics",
        data: [biodataCount, maleCount, femaleCount, premiumCount, stats.revenue || 0],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Flex container for statistics and chart */}
      <div className="flex gap-8 items-center justify-between">
        {/* Statistics Section */}
        <div className="bg-gray-300 p-6 rounded shadow w-1/2">
          <h2 className="text-xl font-semibold mb-4">Statistics Summary</h2>
          <p className="text-lg mb-2">
            Total Biodata Count: <strong>{biodataCount}</strong>
          </p>
          <p className="text-lg mb-2">
            Male Biodata Count: <strong>{maleCount}</strong>
          </p>
          <p className="text-lg mb-2">
            Female Biodata Count: <strong>{femaleCount}</strong>
          </p>
          <p className="text-lg mb-2">
            Premium Biodata Count: <strong>{premiumCount}</strong>
          </p>
          <p className="text-lg">
            Total Revenue: <strong>${stats.revenue || 0}</strong>
          </p>
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white p-6 rounded shadow w-1/2">
          <h2 className="text-xl font-semibold mb-4 text-center">Biodata Statistics - Pie Chart</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


