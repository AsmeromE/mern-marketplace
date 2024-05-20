import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  const [users, setUsers] = useState([]);

  const addUserToList = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div className="App">
      <h1>MERN Marketplace</h1>
      <AddUser addUserToList={addUserToList} />
      <UserList users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
