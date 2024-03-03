import dynamic from "next/dynamic";

const MapSection = dynamic(() => import("./components/map-section"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-full text-center py-4 bg-blue-600 text-white shadow-xl">
        <h1 className="text-lg">Location Clustering</h1>
      </div>
      <div className="flex-grow flex h-full relative overflow-hidden">
        <MapSection />
      </div>
    </div>
  );
}
