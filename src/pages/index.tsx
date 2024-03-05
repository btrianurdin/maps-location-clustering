import { IMapBounds } from "@/interfaces";
import dynamic from "next/dynamic";
import { useState } from "react";
import ListsSection from "./components/lists-section";

const MapSection = dynamic(() => import("./components/map-section"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

interface IBoundsState extends IMapBounds {
  zoomLevel: number;
}

export default function Home() {
  const [bounds, setBounds] = useState<IBoundsState>({
    northEast: [-7.7695476597210105, 110.38564682006837],
    southWest: [-7.80556171687671, 110.34822463989259],
    zoomLevel: 16,
  });
  const [clusterId, setClusterId] = useState<number | null>(null);

  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full text-center py-4 bg-blue-600 text-white shadow-xl">
        <h1 className="text-lg">Location Clustering</h1>
      </div>
      <div className="flex-grow flex h-full relative overflow-hidden">
        <ListsSection activeClusterId={clusterId} bounds={bounds} />
        <MapSection
          bounds={bounds}
          acitveClusterId={clusterId}
          onMove={(bounds) => {
            setClusterId(null);
            setBounds((prev) => ({ ...prev, ...bounds }));
          }}
          onZoom={(bounds, zoomLevel) => {
            setBounds((prev) => ({ ...prev, ...bounds, zoomLevel }));
          }}
          onClusterClick={(isCluster, clusterId) => {
            if (isCluster && clusterId) {
              setClusterId(clusterId);
            }
          }}
        />
      </div>
    </div>
  );
}
