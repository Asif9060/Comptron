import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

const UserGrowthGraph = () => {
   const navigate = useNavigate();
   const [growthData, setGrowthData] = useState([]);

   useEffect(() => {
      fetch("https://comptron-server-2.onrender.com/api/users/user-growth")
         .then((res) => res.json())
         .then((data) => setGrowthData(data))
         .catch((err) => console.error(err));
   }, []);

   const chartData = {
      labels: growthData.map((item) => item._id), // Date of registration
      datasets: [
         {
            label: "User Growth Over Time",
            data: growthData.map((item) => item.count), // User count on each day
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
            tension: 0.4,
         },
      ],
   };

   return (
      <div className="min-h-screen">
         <div className="w-full px-4 py-4">
            <button
               onClick={() => navigate(-1)}
               className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
               ← Back
            </button>
         </div>
         <div className="bg-[#1c1c1e] p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">User Growth</h2>
            <Line data={chartData} />
         </div>
      </div>
   );
};

export default UserGrowthGraph;
