import { MapContainer, Marker, TileLayer } from "react-leaflet";
import MapMoveControl from "../map-move-control";
import MapZoomControl from "../map-zoom-control";
import { IClusterLists, IMapBounds } from "@/interfaces";
import useGetClusters from "@/queries/use-get-clusters";
import clsx from "clsx";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import MapFloatingSearching from "../map-floating-searching";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";

interface IMapSectionProps {
  bounds: IMapBounds & { zoomLevel: number };
  acitveClusterId: number | null;
  onMove: (bounds: IMapBounds) => void;
  onZoom: (bounds: IMapBounds, zoom: number) => void;
  onClusterClick: (isCluster: boolean, clusterId?: number) => void;
}

const MapSection = (props: IMapSectionProps) => {
  const [clusters, setClusters] = useState<IClusterLists[]>([]);

  const clustersQuery = useGetClusters({
    bounds: {
      northEast: props.bounds.northEast,
      southWest: props.bounds.southWest,
    },
    zoomLevel: props.bounds.zoomLevel,
  });

  useEffect(() => {
    const data = clustersQuery.data?.payload?.clusters;
    if (data) {
      setClusters(clustersQuery.data?.payload?.clusters || []);
    }
  }, [clustersQuery.data?.payload?.clusters, clustersQuery.isSuccess]);

  const initialBounds = useMemo(() => {
    if (props.bounds) {
      return [
        [props.bounds.northEast[0], props.bounds.northEast[1]],
        [props.bounds.southWest[0], props.bounds.southWest[1]],
      ];
    }
    return [
      [-7.775670687112559, 110.3869331021706],
      [-7.810068564955439, 110.33496262029804],
    ];
  }, [props.bounds]);

  return (
    <div className="relative w-full h-full bg-gray-300">
      <MapFloatingSearching loading={clustersQuery.isLoading} />
      <MapContainer
        bounds={initialBounds as any}
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
        }}
        minZoom={13}
        zoomControl={false}
        className="[&_.leaflet-attribution-flag]:!hidden"
      >
        <TileLayer
          attribution='github: <a href="https://github.com/btrianurdin">btrianurdin</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {clusters.map((cluster, idx) => {
          const noPrice =
            !cluster.is_cluster && "price" in cluster && cluster.price === "";
          return (
            <Marker
              key={cluster.cluster_id ?? idx}
              position={[cluster.coordinates[1], cluster.coordinates[0]]}
              eventHandlers={{
                click: () =>
                  props.onClusterClick(cluster.is_cluster, cluster.cluster_id),
              }}
              icon={L.divIcon({
                html: renderToStaticMarkup(
                  <div
                    className={clsx(
                      "bg-blue-600 text-white !text-xs rounded-full flex shadow-xl border border-gray-400 items-center justify-center h-6 w-16",
                      {
                        "w-6": cluster.is_cluster,
                        "!w-5 !h-3": noPrice,
                        "bg-red-500":
                          props.acitveClusterId === cluster.cluster_id,
                      }
                    )}
                  >
                    {cluster.is_cluster ? cluster.point_count : cluster.price}
                  </div>
                ),
                className: "-left-10 -top-4",
              })}
            />
          );
        })}

        <MapMoveControl onMove={props.onMove} />
        <MapZoomControl onZoom={props.onZoom} />
      </MapContainer>
    </div>
  );
};

export default MapSection;
