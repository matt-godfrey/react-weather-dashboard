import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";

interface HourlyForecastProps {}

export default function HourlyForecast({}: HourlyForecastProps) {
  // won't double query since we're using the same query key in App.tsx
  // useQuery
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 45.42, lon: -75.69 }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex flex-row gap-6 overflow-x-scroll"
      // overflow-x-scroll: prevent hourly temps from extending way outside div
      // flex-row: children go horizontally; this is default so not necessary to write
    >
      {data.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
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
