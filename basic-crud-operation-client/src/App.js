import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="App">
      <h3>Users : {users.length} </h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {" "}
            ID : {user.id} Name : {user.name}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
