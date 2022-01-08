import { useState } from "react";

export const useLocationData = () => {
  const [locationData, setLocationData] = useState();

  console.log(locationData);

  return {
    locationData,
    setLocationData,
  };
};
