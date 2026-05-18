import type { Coords } from "../types";
import { getWeather } from "./api";

export function weatherQuery(coords: Coords) {
  return {
    queryKey: ["weather", coords.lat, coords.lon],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon }),
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  };
}
