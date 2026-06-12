import { useEffect, useState } from "react";
import Button from "./component/Button";

function App() {
  const [places, setPlaces] = useState([]);
  const [location, setLocation] = useState(null);

  const locations = [
    { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
    { name: "Kollam", lat: 8.8932, lon: 76.6141 },
    { name: "Pathanamthitta", lat: 9.2648, lon: 76.787 },
    { name: "Alappuzha", lat: 9.4981, lon: 76.3388 },
    { name: "Kottayam", lat: 9.5916, lon: 76.5222 },
    { name: "Idukki", lat: 9.849, lon: 76.972 },
    { name: "Ernakulam", lat: 9.9816, lon: 76.2999 },
    { name: "Thrissur", lat: 10.5276, lon: 76.2144 },
    { name: "Palakkad", lat: 10.7867, lon: 76.6548 },
    { name: "Malappuram", lat: 11.0732, lon: 76.074 },
    { name: "Kozhikode", lat: 11.2588, lon: 75.7804 },
    { name: "Wayanad", lat: 11.6854, lon: 76.132 },
    { name: "Kannur", lat: 11.8745, lon: 75.3704 },
    { name: "Kasaragod", lat: 12.4996, lon: 74.9869 },
  ];

  function toRad(value) {
    return (value * Math.PI) / 180;
  }
  function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const l1 = toRad(lat1);
    const l2 = toRad(lat2);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  useEffect(() => {
    if (!location) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;

        const sorted = locations
          .map((place) => ({
            ...place,
            distance: calculateDistance(userLat, userLon, place.lat, place.lon),
          }))
          .sort((a, b) => a.distance - b.distance);

        setPlaces(sorted);
      },
      (error) => {
        console.log(error);
        alert("Location access denied!");
      }
    );
  }, [location]);

  return (
    <div className="flex flex-col items-center min-h-screen pt-10">
      <Button getLocation={() => setLocation(true)} />
      {location && (
        <ol>
          {places.map((place) => (
            <li key={place.name}>
              {place.name} - {place.distance.toFixed(2)} km
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default App;
