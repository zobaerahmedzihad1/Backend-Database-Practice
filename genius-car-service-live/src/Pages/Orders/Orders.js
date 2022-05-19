import axios from "axios";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import axiosPrivate from "../../api/axiousPrivate";
import auth from "../../firebase.init";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const email = user?.email;
      const url = `http://localhost:5000/order?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // });
        setOrders(data);
      } catch (error) {
        console.log(error);
        if (error.response.status === 401 || error.response.status === 403) {
          navigate("/login");
          signOut(auth);
        }
      }
    };
    getOrders();
  }, [user]);

  return (
    <div>
      <h3>Orders component.</h3>
      <h2> Orders : {orders.length} </h2>
    </div>
  );
};

export default Orders;
