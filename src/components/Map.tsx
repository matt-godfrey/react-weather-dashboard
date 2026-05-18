import { TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Coords, MapClickProps } from "../types";

interface MapProps {
  coords: Coords;
  onCoordsChange: (coords: Coords) => void;
}

export default function Map({ coords, onCoordsChange }: MapProps) {
  return (
    // { lat: 45.42, lon: -75.69 }
    <MapContainer
      center={[coords.lat, coords.lon]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ width: "1000px", height: "500px" }}
    >
      <MapClick onCoordsChange={onCoordsChange} />
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

  map.on("click", (e) => {
    // console.log(e);
    map.panTo([e.latlng.lat, e.latlng.lng]);

    props.onCoordsChange({
      lat: e.latlng.lat,
      lon: e.latlng.lng,
    });
  });
  return null;
}
