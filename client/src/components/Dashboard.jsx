import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import SalesGraph from "./SalesGraph"; // Create a SalesGraph component

const Dashboard = () => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  return (
    <div>
      {/* <h2 className="text-2xl font-semibold mb-4 text-center">Dashboard</h2> */}
      <div className="flex justify-between items-center mb-4">
        {/* <h2 className="text-2xl font-bold">Sales Overview</h2> */}
        <button onClick={toggleFilterModal} className="dark:text-white">
          <FaFilter size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <SalesGraph />
        {/* <SalesGraph type="quarterly" />
        <SalesGraph type="yearly" /> */}
      </div>
      {isFilterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3 dark:bg-gray-700">
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
