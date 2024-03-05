import { IHttpResponse, IMapBounds } from "@/interfaces";
import clientHttp from "@/utils/client-http";
import { useQuery } from "@tanstack/react-query";

interface IGetLocationsParams {
  bounds: IMapBounds & { zoomLevel: number };
  clusterId: number | null;
}

interface IGetLocationsResponse {
  locations: Array<{
    location_id: string;
    name: string;
    price: string;
    rating: string;
    latitude: string;
    longitude: string;
    url: string;
    thumbnail: string;
  }>;
  total: number;
}

const getLocations = async (
  params: IGetLocationsParams
): Promise<IHttpResponse<IGetLocationsResponse>> =>
  await clientHttp()
    .post("locations", {
      json: {
        bounds: {
          northEast: params.bounds.northEast,
          southWest: params.bounds.southWest,
        },
        cluster_id: params.clusterId,
        zoom_level: params.bounds.zoomLevel,
      },
    })
    .json();

const useGetLocations = (params: IGetLocationsParams) =>
  useQuery({
    queryKey: useGetLocations.keys(params),
    queryFn: () => getLocations(params),
  });

useGetLocations.keys = (params: IGetLocationsParams) => [
  "locations",
  {
    bounds: [params.bounds.northEast, params.bounds.southWest],
    clusterId: params.clusterId,
    zoomLevel: params.bounds.zoomLevel,
  },
];

export default useGetLocations;
