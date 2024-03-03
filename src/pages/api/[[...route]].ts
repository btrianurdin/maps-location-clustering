import { IClusterRequestPayload } from "@/servers/interfaces";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { handle } from "hono/vercel";
import hotelsData from "@/data/id-hotels-geojson.json";
import { IClusterLists, IGeoJsonFormat, IHotelData } from "@/interfaces";
import withBounds from "@/servers/middleware/with-bounds";
import readBounds from "@/utils/read-bounds";
import Supercluster from "supercluster";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", (c) => {
  return c.json({ message: "Clustering API" });
});

app.post("/all", withBounds(), async (c) => {
  const { bounds } = await c.req.json<IClusterRequestPayload>();

  const data = hotelsData as GeoJSON.FeatureCollection<
    GeoJSON.Point,
    IHotelData
  >;

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

app.post("/clusters", withBounds(), async (c) => {
  const { bounds, zoom_level } = await c.req.json<IClusterRequestPayload>();

  if (!zoom_level)
    throw new HTTPException(400, { message: "zoom_level is required" });

  const data = hotelsData as GeoJSON.FeatureCollection<
    GeoJSON.Point,
    IHotelData
  >;

  const { west, south, east, north } = readBounds(bounds);

  const createCluster = new Supercluster<IHotelData>({
    radius: 30,
    maxZoom: 18,
    minZoom: 5,
  });
  createCluster.load(data.features);

  const clusters: IClusterLists[] = createCluster
    .getClusters(
      [west, south, east, north],
      // supercluster is developed by mapbox, and the zoom level of mapbox is different from leaflet,
      // so we need to -1.5 from the zoom level to make it compatible with leaflet
      zoom_level - 1.5
    )
    .map((cluster) => {
      if ("cluster" in cluster.properties) {
        return {
          is_cluster: true,
          cluster_id: cluster.properties.cluster_id,
          point_count: cluster.properties.point_count,
          coordinates: cluster.geometry.coordinates as [number, number],
        };
      }

      return {
        is_cluster: false,
        coordinates: cluster.geometry.coordinates as [number, number],
        price: cluster.properties.price,
      };
    });

  return c.json({
    status: "success",
    payload: {
      clusters,
      total: clusters.length,
    },
  });
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
