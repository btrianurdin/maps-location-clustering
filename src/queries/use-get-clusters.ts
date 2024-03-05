import { IClusterLists, IHttpResponse, IMapBounds } from "@/interfaces";
import clientHttp from "@/utils/client-http";
import { useQuery } from "@tanstack/react-query";

interface IGetClustersParams {
  bounds: IMapBounds;
  zoomLevel: number;
}

interface IGetClustersResponse {
  clusters: Array<IClusterLists>;
  total: number;
}

const getClusters = async (
  params: IGetClustersParams
): Promise<IHttpResponse<IGetClustersResponse>> =>
  await clientHttp()
    .post("clusters", {
      json: {
        bounds: params.bounds,
        zoom_level: params.zoomLevel,
      },
    })
    .json();

const useGetClusters = (params: IGetClustersParams) =>
  useQuery({
    queryKey: useGetClusters.keys(params),
    queryFn: () => getClusters(params),
  });

useGetClusters.keys = (params: IGetClustersParams) => [
  "clusters",
  {
    bounds: [params.bounds.northEast, params.bounds.southWest],
    zoomLevel: params.zoomLevel,
  },
];

export default useGetClusters;
