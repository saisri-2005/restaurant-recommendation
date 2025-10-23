import React, { useState, useEffect, useRef } from "react";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // required for bounds
import "mapbox-gl/dist/mapbox-gl.css";

const cuisineColors = {
  Indian: "#FF6B6B",
  Chinese: "#FFD93D",
  Italian: "#6BCB77",
  Thai: "#4D96FF",
  Japanese: "#FF6EC7",
  FastFood: "#FFA500",
  Vegan: "#00C49A",
  Seafood: "#008080",
  Cafe: "#A569BD",
  Asian: "#F7DC6F",
  Mughlai: "#D35400",
  Continental: "#5D6D7E",
  BBQ: "#E74C3C",
  SouthIndian: "#1ABC9C",
  NorthIndian: "#F39C12",
  Vegetarian: "#27AE60",
  Healthy: "#2ECC71",
  Beverages: "#2980B9",
  Bakery: "#E59866"
};

const MapComponent = ({ restaurants, selectedRestaurant, setSelectedRestaurant }) => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const mapboxToken =
    "pk.eyJ1Ijoic2Fpc3JpLWNob3dkYXJ5IiwiYSI6ImNtZ3kzNWM0dzE2eHkybHNicjNhcjA3bXkifQ.bx2wORK37DBq4-4e5AK6wA";

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error(err)
    );
  }, []);

  // Fit map to selected restaurant or all filtered restaurants
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    if (selectedRestaurant) {
      map.flyTo({ center: [selectedRestaurant.lng, selectedRestaurant.lat], zoom: 12 });
    } else if (restaurants.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      restaurants.forEach((r) => {
        if (r.lat && r.lng) bounds.extend([r.lng, r.lat]);
      });
      if (userLocation) bounds.extend([userLocation.lng, userLocation.lat]);
      map.fitBounds(bounds, { padding: 80, maxZoom: 12, duration: 1000 });
    } else {
      // Reset to India view
      map.flyTo({ center: [78.9629, 20.5937], zoom: 4 });
    }
  }, [restaurants, selectedRestaurant, userLocation]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{ latitude: 20.5937, longitude: 78.9629, zoom: 4 }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={mapboxToken}
    >
      <NavigationControl position="top-right" />

      {/* User location */}
      {userLocation && (
        <Marker latitude={userLocation.lat} longitude={userLocation.lng} color="blue" />
      )}

      {/* Restaurant markers */}
      {restaurants.map((r) =>
        r.lat && r.lng ? (
          <Marker key={r.name} latitude={r.lat} longitude={r.lng}>
            <div
              onClick={() => setSelectedRestaurant(r)}
              style={{
                width: selectedRestaurant?.name === r.name ? 20 : 14,
                height: selectedRestaurant?.name === r.name ? 20 : 14,
                backgroundColor: selectedRestaurant?.name === r.name ? "#00C49A" : "#FF6B6B",
                borderRadius: "50%",
                cursor: "pointer",
                transition: "all 0.3s ease",
                transform: selectedRestaurant?.name === r.name ? "scale(1.3)" : "scale(1)"
              }}
            ></div>
          </Marker>
        ) : null
      )}

      {/* Popup */}
      {selectedRestaurant && userLocation && (
        <Popup
          latitude={selectedRestaurant.lat}
          longitude={selectedRestaurant.lng}
          anchor="top"
          closeOnClick={true}
          onClose={() => setSelectedRestaurant(null)}
          className="custom-popup"
        >
          <div className="popup-content">
            <h3>{selectedRestaurant.name}</h3>
            <div className="cuisine-badges">
              {selectedRestaurant.cuisine.map((c, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: cuisineColors[c.replace(" ", "")] || "#888",
                    color: "#fff",
                    padding: "3px 7px",
                    marginRight: "5px",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
            <p>⭐ {selectedRestaurant.rating}</p>
            <p>{selectedRestaurant.location}</p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${selectedRestaurant.lat},${selectedRestaurant.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="directions-btn"
            >
              Get Directions
            </a>
          </div>
        </Popup>
      )}

      <style>{`
        .custom-popup .mapboxgl-popup-content {
          background: linear-gradient(135deg, #fdf6e3, #ffe6b3);
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.25);
          padding: 15px;
          font-family: 'Poppins', sans-serif;
          min-width: 200px;
        }
        .popup-content h3 {
          margin: 0 0 5px 0;
          font-size: 16px;
          color: #333;
        }
        .popup-content p {
          margin: 4px 0;
          color: #444;
          font-size: 14px;
        }
        .directions-btn {
          display: inline-block;
          margin-top: 8px;
          padding: 6px 12px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-size: 14px;
          transition: 0.3s;
        }
        .directions-btn:hover {
          background-color: #0056b3;
        }
      `}</style>
    </Map>
  );
};

export default MapComponent;

