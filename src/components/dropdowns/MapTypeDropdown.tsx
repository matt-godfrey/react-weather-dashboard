import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  mapType: string;
  setMapType: React.Dispatch<React.SetStateAction<string>>;
}

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Map Type" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {types.map((type) => (
          <SelectItem key={type} value={type} className="capitalize">
            {type.split("_")[0]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const types = [
  "clouds_new",
  "precipitation_new",
  "pressure_new",
  "wind_new",
  "temp_new",
];
