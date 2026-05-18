import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";
import Card from "./Card";
import Sunrise from "/src/assets/sunrise.svg?react";
import Sunset from "/src/assets/sunset.svg?react";
import Cloud from "/src/assets/cloud.svg?react";
import Uv from "/src/assets/uv.svg?react";
import Pressure from "/src/assets/pressure.svg?react";
import Wind from "/src/assets/wind.svg?react";

// https://www.npmjs.com/package/vite-plugin-svgr

interface AdditionalInfoProps {}

export default function AdditionalInfo({}: AdditionalInfoProps) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather"],
    queryFn: () => getWeather({ lat: 45.42, lon: -75.69 }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {rows.map((row) => (
        <div className="flex justify-between" key={row.value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{row.label}</span>
            <row.Icon className="size-8 invert" />
          </div>
          <span>
            <FormatComponent
              value={row.value}
              number={data.current[row.value]}
            />
          </span>
        </div>
      ))}
    </Card>
  );
}

function FormatComponent({ value, number }: { value: string; number: number }) {
  if (value === "sunrise" || value === "sunset") {
    return new Date(number * 1000).toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return number;
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "clouds",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uvi",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_deg",
    Icon: Wind,
  },
  {
    label: "Pressure (hpa)",
    value: "pressure",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const;
