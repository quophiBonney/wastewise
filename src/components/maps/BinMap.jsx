"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Map auto-centering on position update
const UpdateMapCenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position]);
  return null;
};

const BinMap = ({ userLocation, binLocation }) => {
  const defaultCenter = binLocation || [5.6148, -0.2059]; // fallback

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      className="h-[400px] w-full rounded"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <UpdateMapCenter position={userLocation} />

      {userLocation && (
        <Marker position={userLocation}>
          <Popup>You are here</Popup>
        </Marker>
      )}

      {binLocation && (
        <Marker position={binLocation} icon={L.icon({
          iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",}
          )}>
          <Popup>Bin Pickup Point</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default BinMap;
