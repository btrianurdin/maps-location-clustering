import { IMapBounds } from "@/interfaces";
import dynamic from "next/dynamic";
import { useState } from "react";
import ListsSection from "./components/lists-section";
import { useWindowSize } from "usehooks-ts";

const MapSection = dynamic(() => import("./components/map-section"), {
  ssr: false,
});

interface IBoundsState extends IMapBounds {
  zoomLevel: number;
}

export default function Home() {
  const { width = 0 } = useWindowSize();

  const [showMapOnMobile, setShowMapOnMobile] = useState(false);
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
        {(!showMapOnMobile || width > 768) && (
          <ListsSection activeClusterId={clusterId} bounds={bounds} />
        )}
        {(showMapOnMobile || width > 768) && (
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
                setTimeout(() => {
                  setShowMapOnMobile(false);
                }, 200);
              }
            }}
          />
        )}
        <button
          className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-blue-600 py-3 px-4 text-white flex items-center gap-1.5 rounded-full md:hidden z-[999] shadow-2xl"
          onClick={() => setShowMapOnMobile((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-map"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
            <path d="M9 4v13" />
            <path d="M15 7v13" />
          </svg>
          {showMapOnMobile ? "Hide" : "Show"} Map
        </button>
      </div>
    </div>
  );
}
