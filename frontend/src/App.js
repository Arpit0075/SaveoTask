import "./App.css";

import MapConfig from "./MapConfig";
import { useState } from "react";

function App() {
  //filling in details
  const [details, setDetails] = useState({
    location: "",
    latitude: "",
    longitude: "",
  });

  //displaying
  const [searchLocations, setSearchLocations] = useState([]);

  //button status for show routes
  const [stats, setStats] = useState(false);

  //error message from backend on rate limit excess
  const [error, setError] = useState("");

  //routes for map
  const [routes, setRoutes] = useState([]);

  const [showRoute, setShowRoute] = useState(false);

  const [center, setCenter] = useState({ lat: 23.84, lng: 77.7 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const sendData = async () => {
    //console.log("click");
    const deployedUrl = "https://saveo-91.herokuapp.com/";
    const response = await fetch(deployedUrl);

    const data = await response.json();
    //console.log(data);
    setError(data.error);

    if (searchLocations.length > 1) {
      let temp = [];
      searchLocations.map((data, index) =>
        // setRoutes([...routes, {lat: parseFloat(data.latitude) , lng: parseFloat(data.longitude)}])
        temp.push({
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude),
        })
      );
      setRoutes(temp);
      setShowRoute(true);
    }
  };

  return (
    <div className="App">
      <button className="homeBtn">Home</button>
      <div className="container">
        <div className="header">
          <div className="form">
            <label>Location Name</label>
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={details.location}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <label>Enter Latitude</label>
            <input
              type="number"
              placeholder="Lat"
              name="latitude"
              value={details.latitude}
              onChange={handleChange}
            />
          </div>
          <div className="form">
            <label>Enter Longitude</label>
            <input
              type="number"
              placeholder="Lon"
              name="longitude"
              value={details.longitude}
              onChange={handleChange}
            />
          </div>
          <button
            onClick={() => {
              setSearchLocations([...searchLocations, details]);
              if (searchLocations.length > 0) {
                setStats(true);
              }
              setDetails({
                ...details,
                location: "",
                latitude: "",
                longitude: "",
              });
              setCenter({
                lat: parseFloat(details.latitude),
                lng: parseFloat(details.longitude),
              });
            }}
            className="add"
          >
            Add
          </button>
        </div>
        <div className="data-container">
          <div className="data">
            <h1>All Co-ordinates:</h1>

            {searchLocations &&
              searchLocations.map((each) => {
                return (
                  <div key={each.index}>
                    <li> {each.location}</li>
                    <p> {each.latitude}</p>
                    <p> {each.longitude}</p>
                  </div>
                );
              })}

            <button
              className={stats ? "routes" : " routes routes-disabled"}
              onClick={sendData}
            >
              Show Routes
            </button>
          </div>
          <div className="map">
            <MapConfig
              locations={searchLocations}
              showRoute={showRoute}
              routes={routes}
              center={center}
            />
          </div>
        </div>
      </div>
      <p className="message"> {error} </p>
    </div>
  );
}

export default App;
