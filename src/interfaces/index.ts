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

export interface IGeoJsonFormat<T = any> {
  type: string;
  features: Array<IGeoJsonFeature<T>>;
}

export interface IGeoJsonFeature<T> {
  type: string;
  properties: T;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}