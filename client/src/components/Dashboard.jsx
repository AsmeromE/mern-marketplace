import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [userStats, setUserStats] = useState({ users: 0, admins: 0 });

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
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Users</h3>
          <p className="text-3xl">{userStats.users}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-lg font-medium">Total Admins</h3>
          <p className="text-3xl">{userStats.admins}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
