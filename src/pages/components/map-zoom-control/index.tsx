import { IMapBounds } from "@/interfaces";
import { useRef } from "react";
import { useMap, useMapEvent } from "react-leaflet";

interface IZoomControlProps {
  onZoom: (bounds: IMapBounds, zoom: number) => void;
}

const MapZoomControl = ({ onZoom }: IZoomControlProps) => {
  const map = useMap();
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  useMapEvent("zoomend", () => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
    }

    delayRef.current = setTimeout(() => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      onZoom(
        {
          northEast: [northEast.lat, northEast.lng],
          southWest: [southWest.lat, southWest.lng],
        },
        map.getZoom()
      );
    }, 500);
  });

  return null;
};

export default MapZoomControl;
