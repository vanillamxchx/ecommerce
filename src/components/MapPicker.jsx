import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
const pin = new L.DivIcon({
  className: "custom-pin",
  html: "<span>✦</span>",
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});
function Locator({ position }) {
  const map = useMapEvents({});
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return <Marker position={position} icon={pin} />;
}
export default function MapPicker({ position }) {
  return (
    <div className="map-wrap">
      <MapContainer center={position} zoom={12} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Locator position={position} />
      </MapContainer>
      <p>Your pin updates automatically from the delivery address above.</p>
    </div>
  );
}
