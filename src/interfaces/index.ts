export interface IMapBounds {
  northEast: [number, number];
  southWest: [number, number];
}

export interface IHotelData {
  location_id: string;
  name: string;
  price: string;
  rating: string;
  latitude: string;
  longitude: string;
  url: string;
  thumbnail: string;
}

export interface IClusterLists {
  is_cluster: boolean;
  coordinates: [number, number];
  cluster_id?: number;
  point_count?: number;
  price?: string;
}

export interface IHttpResponse<T = any> {
  status: "success" | "error";
  message: string;
  payload?: T;
}
