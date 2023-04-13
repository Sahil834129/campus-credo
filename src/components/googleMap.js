import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

function Map() {
  const [url, setUrl] = useState();
  const schoolLatitude = localStorage.getItem("SchoolDetailsLatitude");
  const schoolLongitude = localStorage.getItem("SchoolDetailsLongitude");
  const userLatitude = localStorage.getItem("userLatitude");
  const userLongitude = localStorage.getItem("userLongitude");

  useEffect(() => {
    if (userLatitude && userLongitude) {
      setUrl(`https://www.google.com/maps/embed/v1/directions?key=AIzaSyBMP95aNz-7G4CiRf5-6msK1pn7YkQQOsQ&origin=${schoolLatitude},${schoolLongitude}&destination=${userLatitude},${userLongitude}`);
    } else {
      setUrl(`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMP95aNz-7G4CiRf5-6msK1pn7YkQQOsQ&q=${schoolLatitude},${schoolLongitude}`);
    }

  }, [schoolLatitude, schoolLongitude, userLatitude, userLongitude]);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "56.25%",
      }}>
      <iframe
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%"
        }}
        src={url}
        allowFullScreen
        title="Google Map"
      />
    </div>
  );
}

export default Map;
