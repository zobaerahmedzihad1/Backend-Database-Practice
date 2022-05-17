import React from "react";
import useServices from "../../hooks/useServices";

const ManageService = () => {
  const [services, setServices] = useServices();

  const handleDelete = (id) => {
    console.log(id);
    const proceed = window.confirm("Are you want to delete ?");
    if (proceed) {
      const url = `http://localhost:5000/service/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const remaining = services.filter((sercice) => sercice._id !== id);
          setServices(remaining);
        });
      alert("Deleted.");
    }
    // const handleDelete = (id) => {
    //   const proceed = window.confirm("Are you sure?");
    //   if (proceed) {
    //     const url = `http://localhost:5000/service/${id}`;
    //     fetch(url, {
    //       method: "DELETE",
    //     })
    //       .then((res) => res.json())
    //       .then((data) => {
    //         console.log(data);
    //         const remaining = services.filter((service) => service._id !== id);
    //         setServices(remaining);
    //       });
    //   }
  };
  return (
    <div className="text-center">
      <h3>Manage service.</h3>
      {services.map((service) => (
        <div key={service._id}>
          <h3>
            Name : {service.name}{" "}
            <button onClick={() => handleDelete(service._id)}>Delete</button>{" "}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ManageService;
