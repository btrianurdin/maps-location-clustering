export interface IClusterRequestPayload {
  bounds: IBounds;
  zoom_level?: number;
  cluster_id?: number;
}

interface IBounds {
  southWest: [number, number];
  northEast: [number, number];
}

export interface ILocationsResponse {
  location_id: string;
  name: string;
  rating: string;
  price: string;
  thumbnail: string;
  url: string;
}
