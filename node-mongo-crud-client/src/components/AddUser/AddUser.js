import React from "react";

const AddUser = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const email = event.target.email.value;

    const user = { name, email };

    //  send data to server.
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    event.target.reset();
  };

  return (
    <div className="text-center">
      <h3>Please add a user.</h3>
      <form onSubmit={handleSubmit}>
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
        <input type="submit" value="Add user" />
      </form>
    </div>
  );
};

export default AddUser;
