import React, { useEffect, useState } from "react";

const SuccessCounterSection = () => {
  const [stats, setStats] = useState({
    totalBiodata: 0,
    totalGirls: 0,
    totalBoys: 0,
    totalMarriages: 0,
  });

  useEffect(() => {
    // Fetch biodata stats
    fetch("https://evermatch-server.vercel.app/biodataStats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats((prevStats) => ({
            ...prevStats,
            totalBiodata: data.data.totalBiodata,
            totalGirls: data.data.totalGirls,
            totalBoys: data.data.totalBoys,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching biodata stats:", error);
      });

    // Fetch marriage stats
    fetch("https://evermatch-server.vercel.app/marriageStats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats((prevStats) => ({
            ...prevStats,
            totalMarriages: data.data.totalMarriages,
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching marriage stats:", error);
      });
  }, []);

  return (
    <section className="bg-[#ffe4795c] py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-8">
          Success Counter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Total Biodata */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-[#480f21]">
              {stats.totalBiodata}
            </h3>
            <p className="text-gray-600">Total Biodata</p>
          </div>

          {/* Total Girls */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-[#480f21]">
              {stats.totalGirls}
            </h3>
            <p className="text-gray-600">Total Girls Biodata</p>
          </div>

          {/* Total Boys */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-[#480f21]">
              {stats.totalBoys}
            </h3>
            <p className="text-gray-600">Total Boys Biodata</p>
          </div>

          {/* Total Marriages */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold text-[#480f21]">
              {stats.totalMarriages}
            </h3>
            <p className="text-gray-600">Marriages Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounterSection;
