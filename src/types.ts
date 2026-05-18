export type Coords = {
  lat: number;
  lon: number;
};

export type MapClickProps = {
  onCoordsChange: (coords: Coords) => void;
};
