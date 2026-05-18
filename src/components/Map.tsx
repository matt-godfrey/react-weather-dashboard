import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords, MapClickProps } from "../types";
import { useEffect } from "react";

interface MapProps {
  coords: Coords;
  onCoordsChange: (coords: Coords) => void;
  // onCoordsChange: (lat: number, lon: number) => void;
}

export default function Map({ coords, onCoordsChange }: MapProps) {
  return (
    // { lat: 45.42, lon: -75.69 }
    <MapContainer
      // providing a key here forces react to re-render component when we select a new city from dropdown
      // however, this causes a noticeable flickering of the UI
      // key={`${coords.lat},${coords.lon}`}
      center={[coords.lat, coords.lon]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ width: "1000px", height: "500px" }}
    >
      <MapClick onCoordsChange={onCoordsChange} coords={coords} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coords.lat, coords.lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function MapClick(props: MapClickProps) {
  const map = useMap();
  const coords = props.coords;
  // map.panTo([coords.lat, coords.lon]);
  // uncomment .panTo above if not using useEffect
  useEffect(() => {
    map.panTo([coords.lat, coords.lon]);
  }, [map, coords.lat, coords.lon]);

  map.on("click", (e) => {
    // console.log(e);
    // map.panTo([e.latlng.lat, e.latlng.lng]);

    const { lat, lng } = e.latlng;
    props.onCoordsChange({
      lat: lat,
      lon: lng,
    });
  });
  return null;
}
