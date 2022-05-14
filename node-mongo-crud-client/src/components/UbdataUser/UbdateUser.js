import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UbdateUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/user/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUser(data));
    console.log(url);
    fetch();
  }, [id]);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const name = event.target.name.value;
//     const email = event.target.email.value;

//     const updateUser = { name, email };

//     //  send data to server.
//     const url = `http://localhost:5000/user/${id}`;
//     fetch(url, {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(updateUser),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log(data));
//     event.target.reset();
//   };
const handleUpdateUser = event =>{
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const updatedUser = {name, email};

        // send data to the server
        const url = `http://localhost:5000/user/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data =>{
            console.log('success', data);
            alert('users added successfully!!!');
            event.target.reset();
        })
    }

  return (
    <div>
      <h3>ubdate user : {id}</h3>
      <h3>Name : {user.name} </h3>
      <div className="text-center">
        <h3>Please update the user.</h3>
        <form onSubmit={handleUpdateUser}>
          <input
            className="m-2"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <br />
          <input
            className="m-2"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
          <br />
          <input type="submit" value="update user" />
        </form>
      </div>
    </div>
  );
};

export default UbdateUser;
