import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    fetch("http://localhost:5000/user", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newUser = [...users, data];
        setUsers(newUser);
      });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);
  return (
    <div className="App">
      <h3>send data to server.</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" required placeholder="Name" />
        <br />
        <input type="email" name="email" id="" required placeholder="Email" />
        <br />
        <input type="submit" value="submit" />
      </form>

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
