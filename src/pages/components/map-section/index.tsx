import { MapContainer, TileLayer } from "react-leaflet";
import MapMoveControl from "../map-move-control";
import MapZoomControl from "../map-zoom-control";

const MapSection = () => {
  return (
    <div className="w-full h-full bg-gray-300">
      <MapContainer
        bounds={[
          [-7.775670687112559, 110.3869331021706],
          [-7.810068564955439, 110.33496262029804],
        ]}
        zoom={10}
        style={{
          height: "100%",
          width: "100%",
        }}
        minZoom={10}
        zoomControl={false}
        className="[&_.leaflet-attribution-flag]:!hidden"
      >
        <TileLayer
          attribution='github: <a href="https://github.com/btrianurdin">btrianurdin</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapMoveControl
          onMove={(bound) => {
            // console.log('move', bound);
          }}
        />
        <MapZoomControl
          onZoom={(bound) => {
            // console.log('zoom', bound);
          }}
        />
      </MapContainer>
    </div>
  );
};

export default MapSection;
