import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import SalesGraph from "./SalesGraph"; // Create a SalesGraph component

const Dashboard = () => {
  const [userStats, setUserStats] = useState({ users: 0, admins: 0 });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user-stats", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user statistics");
        }

        const data = await response.json();
        setUserStats(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl">{userStats.users}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Admins</h3>
          <p className="text-3xl">{userStats.admins}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Sales Overview</h2>
        <button onClick={toggleFilterModal}>
          <FaFilter size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1gap-4">
        <SalesGraph />
        {/* <SalesGraph type="quarterly" />
        <SalesGraph type="yearly" /> */}
      </div>
      {isFilterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Custom Graph Filter</h2>
            {/* Add your filter form here */}
            <button
              onClick={toggleFilterModal}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
