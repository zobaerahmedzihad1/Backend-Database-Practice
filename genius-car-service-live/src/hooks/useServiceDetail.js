import { useEffect, useState } from "react";

const useServiceDetail = (serviceId) => {
  const [service, setService] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/service/${serviceId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setService(data));
  }, [serviceId]);
  return [service, setService];
};
export default useServiceDetail;
