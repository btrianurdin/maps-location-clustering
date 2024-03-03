import { IClusterRequestPayload } from "@/servers/interfaces";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";
import hotelsData from "@/data/id-hotels-geojson.json";
import { IGeoJsonFormat, IHotelData } from "@/interfaces";
import withBounds from "@/servers/middleware/with-bounds";
import readBounds from "@/utils/read-bounds";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Clustering API" });
});

app.post("/all", withBounds(), async (c) => {
  const { bounds } = await c.req.json<IClusterRequestPayload>();

  const data = hotelsData as IGeoJsonFormat<IHotelData>;

  const { west, south, east, north } = readBounds(bounds);

  const filterData = data.features.filter((feature) => {
    const [longitude, latitude] = feature.geometry.coordinates;
    return (
      latitude <= north &&
      latitude >= south &&
      longitude <= east &&
      longitude >= west
    );
  });

  return c.json({
    status: "success",
    payload: {
      geojson: {
        type: "FeatureCollection",
        features: filterData,
      },
      total: filterData.length,
    },
  });
});

app.post("/cluster", withBounds(), async (c) => {
  const { bounds, zoom_level } = await c.req.json<IClusterRequestPayload>();

  if (!zoom_level)
    throw new HTTPException(400, { message: "zoom_level is required" });
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      status: "error",
      message: err.message,
    });
  }

  c.status(500);
  return c.json({
    status: "error",
    message: "Internal server error",
  });
});

export default handle(app);
