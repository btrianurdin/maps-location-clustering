export interface IClusterRequestPayload {
  bounds: IBounds;
  zoom_level?: number;
}

interface IBounds {
  southWest: [number, number];
  northEast: [number, number];
}
