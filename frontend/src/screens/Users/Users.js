import React from "react";
import { useHistory } from "react-router-dom";

function Users() {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };

  return (
    <div>
      <h2>Hello Users</h2>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default Users;
