import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";

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
    <Card title="Daily Forecast">
      <div className="flex flex-col gap-4">
        {data?.daily.map((day) => (
          <div key={day.dt} className="flex justify-between">
            <p className="w-9">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>
            <img
              className="size-8"
              src={`https://openweathermap.org/payload/api/media/file/${day.weather[0].icon}.png`}
            ></img>
            <p>{Math.round(day.temp.min)}℃</p>
            <p className="text-gray-500/75">{Math.round(day.temp.min)}℃</p>
            <p className="text-gray-500/75">{Math.round(day.temp.max)}℃</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
