import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../../hooks/useServiceDetail";

const Checkout = () => {
  const { serviceId } = useParams();
  const [service, setService] = useServiceDetail(serviceId);
  const [user, setUser] = useState({
    name: "zihad bro",
    email: "zihad@gmail.com",
    address: "Dhaka",
    phone: "012354",
  });

  const handleChangeAddress = (event) => {
    const { address, ...rest } = user;
    const newAddress = event.target.value;
    const newUser = { address: newAddress, ...rest };
    setUser(newUser);
    console.log(newUser);
  };
  return (
    <div className="text-center">
      <h2>Please Checkout your booking</h2>
      <h3>Service Name : {service.name} </h3>
      <form>
        <input
          className="w-50 mb-2"
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="service"
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="phone"
          value={user.phone}
          placeholder="phone"
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="address"
          onChange={handleChangeAddress}
          value={user.address}
          placeholder="address"
        />
        <br />
        <input className="w-50" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Checkout;
