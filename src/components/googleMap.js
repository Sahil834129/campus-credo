import React from 'react';

function Map() {
  const schoolLatitude = localStorage.getItem("SchoolDetailsLatitude"); 
  const schoolLongitude = localStorage.getItem("SchoolDetailsLongitude");
  const userLatitude =localStorage.getItem("selectedLocationLat");
  const userLongitude =localStorage.getItem("selectedLocationLong");
  const url = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyBMP95aNz-7G4CiRf5-6msK1pn7YkQQOsQ&origin=${schoolLatitude},${schoolLongitude}&destination=${userLatitude},${userLongitude}`;

  return (
    <div 
    // className="map-container" 
    style={{
        position: "relative",
        width: "100%",
        height: "0",
        paddingBottom: "56.25%",
         }}>
      <iframe
        // className="map-iframe"
        style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%"}}
        src={url}
        // frameBorder="0"
        allowFullScreen
        title="Google Map"
      />
    </div>
  );
}

export default Map;
