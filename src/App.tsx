import "./App.css";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { useState } from "react";
import type { Coords } from "./types";

function App() {
  // return <>{JSON.stringify(data)}</>;
  // { lat: 45.42, lon: -75.69 }

  const [coords, setCoords] = useState<Coords>({ lat: 45.42, lon: -75.69 });
  return (
    <div className="flex flex-col gap-8">
      <Map coords={coords} onCoordsChange={setCoords} />
      <CurrentWeather coords={coords} />
      <HourlyForecast coords={coords} />
      <DailyForecast coords={coords} />
      <AdditionalInfo coords={coords} />
    </div>
  );
}
export default App;
