import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you want to delete ?");
    console.log("deleting id : ", id);
    if (proceed) {
      const url = `http://localhost:5000/user/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = users.filter((user) => user._id !== id);
            setUsers(remaining);
          }
        });
    } else {
      return;
    }
  };

  return (
    <div className="text-center">
      <h3>Home</h3>
      <h2> users : {users.length} </h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Name: {user.name} Email : {user.email}{" "}
            <Link to={`/ubdate/${user._id}`}>
              <button>ubdate</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>Delete</button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
