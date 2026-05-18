import { GeocodeSchema } from "../schemas/geocodeSchema";
import { OneCallSchema } from "../schemas/weatherSchema";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`,
    // `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
    // `https://api.open-meteo.com/v1/forecast?latitude=${lat}2&longitude=${lon}&current_weather=true`,
  );

  const data = await res.json();
  return OneCallSchema.parse(data);
}

export async function getGeocode(location: string) {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`,
  );

  const data = await res.json();
  return GeocodeSchema.parse(data);
}
