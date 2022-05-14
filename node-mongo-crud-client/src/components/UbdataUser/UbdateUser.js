import React from "react";
import { useParams } from "react-router-dom";

const UbdateUser = () => {
  const {id} = useParams();
  console.log(id);
  return (
    <div>
      <h3>ubdate user : {id}</h3>
    </div>
  );
};

export default UbdateUser;
