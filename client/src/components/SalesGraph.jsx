import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("monthly");

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/stats/sales?type=${filterType}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sales data");
        }
        const data = await response.json();
        setSalesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [filterType]);

  const handleFilterChange = (newFilterType) => {
    setFilterType(newFilterType);
    setLoading(true);
    setSalesData([]);
  };

  const getLabels = () => {
    if (filterType === "monthly") {
      return [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
    } else if (filterType === "quarterly") {
      return ["Q1", "Q2", "Q3", "Q4"];
    } else if (filterType === "yearly") {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => currentYear - 9 + i);
    }
    return salesData.map((item) => item._id); // for other types
  };

  const getDataValues = () => {
    if (filterType === "monthly") {
      const values = Array(12).fill(0);
      salesData.forEach((item) => {
        values[item._id - 1] = item.totalSales;
      });
      return values;
    } else if (filterType === "quarterly") {
      const values = Array(4).fill(0);
      salesData.forEach((item) => {
        values[item._id - 1] = item.totalSales;
      });
      return values;
    } else if (filterType === "yearly") {
      const currentYear = new Date().getFullYear();
      const values = Array(10).fill(0);
      salesData.forEach((item) => {
        const index = item._id - (currentYear - 9);
        values[index] = item.totalSales;
      });
      return values;
    }
    return salesData.map((item) => item.totalSales); // for other types
  };

  const chartData = {
    labels: getLabels(),
    datasets: [
      {
        label: "Sales",
        data: getDataValues(),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full">
      {/* <h2 className="text-2xl font-semibold mb-4">Sales Graph</h2> */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleFilterChange("monthly")}
          className={`mr-2 p-2 ${
            filterType === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => handleFilterChange("quarterly")}
          className={`mr-2 p-2 ${
            filterType === "quarterly"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Quarterly
        </button>
        <button
          onClick={() => handleFilterChange("yearly")}
          className={`p-2 ${
            filterType === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Yearly
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : salesData.length > 0 ? (
        <div className="w-full h-96">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: `Sales Data (${filterType})` },
              },
              scales: {
                x: {
                  ticks: {
                    callback: function (value) {
                      return getLabels()[value];
                    },
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default SalesGraph;
