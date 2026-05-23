import { useSuspenseQuery } from "@tanstack/react-query";
import { weatherQuery } from "../../api/weatherQueries";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
};

export default function DailyForecast({ coords }: Props) {
  // won't double query since we're using the same query key in App.tsx
  // useQuery
  const { data } = useSuspenseQuery(weatherQuery(coords));

  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-4 2xl:justify-between"
    >
      {/*
        flex-col: children go vertically
        gap-4:
        */}
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between">
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.weather[0].icon} />
          <p>{Math.round(day.temp.min)}℃</p>
          <p className="text-gray-500/75">{Math.round(day.temp.min)}℃</p>
          <p className="text-gray-500/75">{Math.round(day.temp.max)}℃</p>
        </div>
      ))}
    </Card>
  );
}
