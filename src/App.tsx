import "./App.css";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./api/api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";

function App() {
  // { lat: 45.42, lon: -75.69 } => Ottawa
  const [mapCoords, setCoords] = useState<Coords>({ lat: 45.42, lon: -75.69 });

  const [location, setLocation] = useState("Ottawa");
  const [mapType, setMapType] = useState("clouds_new");

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  });

  const onMapClick = (coords: Coords) => {
    setCoords(coords);
    setLocation("custom");
  };

  const coords: Coords =
    location === "custom"
      ? mapCoords
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <div className="flex gap-4">
          <h1>City:</h1>
          <LocationDropdown location={location} setLocation={setLocation} />
        </div>
        <div className="flex gap-4">
          <h1>May Type:</h1>
          <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        </div>
      </div>
      <Map coords={coords} onCoordsChange={onMapClick} mapType={mapType} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}
export default App;
