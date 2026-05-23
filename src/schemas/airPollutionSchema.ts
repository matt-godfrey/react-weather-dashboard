import z from "zod";

const CoordinatesSchema = z.object({
  lat: z.number(),
  lon: z.number(),
});

const AirComponentsSchema = z.object({
  co: z.number(),
  no: z.number(),
  no2: z.number(),
  o3: z.number(),
  so2: z.number(),
  pm2_5: z.number(),
  pm10: z.number(),
  nh3: z.number(),
});

const AirQualitySchema = z.object({
  dt: z.number(),
  main: z.object({
    aqi: z.number(),
  }),
  components: AirComponentsSchema,
});

export const AirPollutionSchema = z.object({
  coord: CoordinatesSchema,
  list: z.array(AirQualitySchema),
});
