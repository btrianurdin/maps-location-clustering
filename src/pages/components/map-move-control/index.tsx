import { useMap, useMapEvent } from "react-leaflet";
import { useRef } from "react";
import { IMapBounds } from "@/interfaces";

interface IMoveControlProps {
  onMove: (bound: IMapBounds) => void;
}

const MapMoveControl = ({ onMove }: IMoveControlProps) => {
  const zoomMode = useRef<boolean>(false);
  const map = useMap();

  useMapEvent("zoomstart", () => {
    zoomMode.current = true;
  });

  useMapEvent("moveend", () => {
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    if (zoomMode.current) {
      zoomMode.current = false;
      return;
    }

    onMove({
      northEast: [northEast.lat, northEast.lng],
      southWest: [southWest.lat, southWest.lng],
    });
  });

  return null;
};

export default MapMoveControl;
