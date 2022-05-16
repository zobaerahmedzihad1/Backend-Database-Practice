import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
  console.log(data);
    const url = 'http://localhost:5000/service';
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
  };
  return (
    <div>
      <h3 className="text-center mt-4">Add new service</h3>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <input className="mb-2 w-50" placeholder="Name" {...register("name", { required: true })} />
        <br />
        <input className="mb-2 w-50" placeholder="Description" {...register("description")} />
        <br />
        <input className="mb-2 w-50" placeholder="Price" type="number" {...register("price")} />
        <br />
        <input className="mb-2 w-50" placeholder="Image" type="text" {...register("img")} />
        <br />
        <input className="mb-2 w-50" type="submit" value='add service' />
      </form>
    </div>
  );
};

export default AddService;
