import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className={`${
                notification.read ? "bg-white" : "bg-blue-100"
              } p-4 rounded shadow-md`}
            >
              <p>{notification.message}</p>
              <p className="text-gray-500 text-sm">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications</p>
      )}
    </div>
  );
};

export default Notifications;
