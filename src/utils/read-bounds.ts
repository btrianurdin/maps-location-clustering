import { IMapBounds } from "@/interfaces";

const readBounds = (bounds: IMapBounds) => {
  return {
    west: bounds.southWest[1],
    south: bounds.southWest[0],
    east: bounds.northEast[1],
    north: bounds.northEast[0],
  };
};

export default readBounds;
