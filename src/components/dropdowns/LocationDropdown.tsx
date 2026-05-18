import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface LocationDropdownProps {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export default function LocationDropdown({
  location,
  setLocation,
}: LocationDropdownProps) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {location === "custom" && (
          <SelectItem value="custom">Custom</SelectItem>
        )}
        {cities.map((city) => (
          <SelectItem key={city} value={city}>
            {city}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const cities = [
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Beijing",
  "Shanghai",
  "Hong Kong",
  "Singapore",
  "Dubai",
  "Los Angeles",
  "Toronto",
  "Mexico City",
  "São Paulo",
  "Buenos Aires",
  "Berlin",
  "Rome",
  "Madrid",
  "Moscow",
  "Istanbul",
  "Cairo",
  "Mumbai",
  "Delhi",
  "Bangkok",
  "Seoul",
  "Sydney",
  "Johannesburg",
];
