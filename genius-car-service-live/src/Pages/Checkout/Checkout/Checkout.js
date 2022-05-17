import React from "react";
import { useParams } from "react-router-dom";
import useServiceDetail from "../../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const Checkout = () => {
  const { serviceId } = useParams();
  const [service, setService] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  const handleOrderSubmit = (event) => {
    event.preventDefault();

    const order = {
      service: service.name,
      name: user.displayName,
      email: user.email,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };
    console.log(order);
  };

  // const [user, setUser] = useState({
  //   name: "zihad bro",
  //   email: "zihad@gmail.com",
  //   address: "Dhaka",
  //   phone: "012354",
  // });

  // const handleChangeAddress = (event) => {
  //   const { address, ...rest } = user;
  //   const newAddress = event.target.value;
  //   const newUser = { address: newAddress, ...rest };
  //   setUser(newUser);
  //   console.log(newUser);
  // };
  return (
    <div className="text-center">
      <h2>Please Checkout your booking</h2>
      <h3>Service Name : {service.name} </h3>
      <form onSubmit={handleOrderSubmit}>
        <input
          className="w-50 mb-2"
          type="text"
          name="name"
          value={user.displayName}
          placeholder="name"
          disabled
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
          disabled
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="service"
          disabled
        />
        <br />
        <input
          className="w-50 mb-2"
          type="number"
          name="phone"
          placeholder="phone"
          autoComplete="off"
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="address"
          placeholder="address"
          autoComplete="off"
        />
        <br />
        <input className="w-50" type="submit" value="Place Order" />
      </form>
    </div>
  );
};

export default Checkout;
