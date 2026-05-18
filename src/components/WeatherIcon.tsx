import clsx from "clsx";

interface WeatherIcon {
  src: string;
  className?: string;
}

export default function WeatherIcon({ src, className }: WeatherIcon) {
  return (
    <img
      // clsx will automatically resolve className param
      // npm i clsx
      className={clsx("size-8", className)}
      src={`https://openweathermap.org/payload/api/media/file/${src}.png`}
      alt="Weather Icon"
    ></img>
  );
}
