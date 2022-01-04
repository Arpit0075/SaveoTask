import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "384px",
};

function MapConfig({ locations, showRoute, routes, center }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  // eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      //center={{ lat: 23.84, lng: 77.7 }}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {locations
        ? locations.map((mark, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(mark.latitude),
                lng: parseFloat(mark.longitude),
              }}
            />
          ))
        : ""}
      {showRoute ? <Polyline path={routes} /> : ""}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapConfig);
