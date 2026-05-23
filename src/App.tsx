import "./App.css";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import { Suspense, useState } from "react";
import type { Coords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import { useQuery } from "@tanstack/react-query";
import { getGeocode } from "./api/api";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton";
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react";

function App() {
  // { lat: 45.42, lon: -75.69 } => Ottawa
  const [mapCoords, setCoords] = useState<Coords>({ lat: 45.42, lon: -75.69 });

  const [location, setLocation] = useState("Ottawa");
  const [mapType, setMapType] = useState("clouds_new");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
    <>
      <div className="flex flex-col gap-8 p-8 w-full lg:w-[calc(100vw-var(--sidebar-width))] 2xl:h-screen">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1>City:</h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              May Type:
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-6 invert ml-auto lg:hidden" />
          </button>
        </div>
        {/*// why does min-h-0 with flex-1 fix spacing issues?*/}
        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          {" "}
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map
              coords={coords}
              onCoordsChange={onMapClick}
              mapType={mapType}
            />
            <MapLegend mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
            {" "}
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            {" "}
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            {" "}
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} />
            </Suspense>
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            {" "}
            <Suspense fallback={<AdditionalInfoSkeleton />}>
              <AdditionalInfo coords={coords} />
            </Suspense>
          </div>
        </div>
      </div>
      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}
export default App;
