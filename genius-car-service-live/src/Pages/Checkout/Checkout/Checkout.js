import React from "react";
import { Link, useParams } from "react-router-dom";
import useServiceDetail from "../../../hooks/useServiceDetail";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const { serviceId } = useParams();
  const [service, setService] = useServiceDetail(serviceId);
  const [user] = useAuthState(auth);

  const handleOrderSubmit = (event) => {
    event.preventDefault();

    const order = {
      service: service.name,
      name: user?.displayName,
      email: user?.email,
      phone: event.target.phone.value,
      address: event.target.address.value,
    };

    const proceed = window.confirm("Are you sure you want to place order ?");
    if (proceed) {
      console.log(order);
      axios.post("http://localhost:5000/order", order).then((response) => {
        console.log(response);
        const { data } = response;
        if (data.insertedId) {
          toast("Your order is pleased.");
        }
      });
    } else {
      return;
    }
    event.target.reset();
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
          readOnly
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
          disabled
          readOnly
        />
        <br />
        <input
          className="w-50 mb-2"
          type="text"
          name="service"
          value={service.name}
          placeholder="service"
          disabled
          readOnly
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
        <Link to='/orders'><input className="w-50" type="submit" value="Place Order" /></Link>
      </form>
    </div>
  );
};

export default Checkout;
