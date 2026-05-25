import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import { weatherQuery } from "../../api/weatherQueries";
import type { Coords } from "../../types";

interface HourlyForecastProps {
  coords: Coords;
}

export default function HourlyForecast({ coords }: HourlyForecastProps) {
  // won't double query since we're using the same query key in App.tsx
  // useQuery
  const { data } = useSuspenseQuery(weatherQuery(coords));

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex flex-row gap-6 overflow-x-scroll"
      // overflow-x-scroll: prevent hourly temps from extending way outside div
      // flex-row: children go horizontally; this is default so not necessary to write
    >
      {data.hourly.map((hour) => (
        <div
          key={hour.dt}
          className="flex flex-col 2xl:justify-between gap-2 items-center p-2"
        >
          <p className="whitespace-nowrap">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p>{Math.round(hour.temp)}℃</p>
        </div>
      ))}
    </Card>
  );
}
