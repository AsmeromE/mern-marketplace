import React from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

function App() {
  return (
    <div className="App">
      <h1>MERN Marketplace</h1>
      <AddUser />
      <UserList />
    </div>
  );
}

export default App;
