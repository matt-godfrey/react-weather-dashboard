import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";

type Props = {};

export default function DailyForecast({}: Props) {
  // won't double query since we're using the same query key in App.tsx
  // useQuery
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 45.42, lon: -75.69 }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
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
