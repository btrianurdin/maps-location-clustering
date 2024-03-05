import clsx from "clsx";
import Skeleton from "../skeleton";
import { IMapBounds } from "@/interfaces";
import useGetLocations from "@/queries/use-get-locations";
import { Rating } from "react-simple-star-rating";
import currency from "@/utils/currency";
import { useEffect, useRef } from "react";

interface IListsSectionProps {
  bounds: IMapBounds & { zoomLevel: number };
  activeClusterId: number | null;
}

const ListsSection = (props: IListsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const locationsQuery = useGetLocations({
    bounds: props.bounds,
    clusterId: props.activeClusterId,
  });

  const locations = locationsQuery.data?.payload?.locations;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [locationsQuery.data?.payload?.locations]);

  return (
    <div ref={scrollRef} className="w-[35%] flex-shrink-0 h-full overflow-auto">
      {locationsQuery.isLoading && <ListSkeleton />}
      {!locationsQuery.isLoading &&
        locations?.map((location) => (
          <div
            key={location.location_id}
            className="p-5 flex flex-col items-start gap-2 w-full border-b border-b-gray-300 hover:bg-blue-50"
          >
            <h1 className="text-xl font-semibold">{location.name}</h1>
            <div className="w-full flex items-center gap-2">
              <h3>Rating: {location.rating}</h3>
              <Rating
                initialValue={parseFloat(location.rating)}
                allowFraction
                size={20}
                SVGclassName="inline-block"
                readonly
              />
            </div>
            {location.price && (
              <h2 className={clsx("text-xl font-semibold")}>
                {currency(location.price)}
              </h2>
            )}
            <a
              href={location.url}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-500 text-white py-2 px-3 rounded-md mt-3 text-sm inline-block"
            >
              See location details
            </a>
          </div>
        ))}
      {!locationsQuery.isLoading && locations?.length === 0 && (
        <div className="p-5 text-center">No locations found</div>
      )}
    </div>
  );
};

const ListSkeleton = () => {
  const count = 10;

  return (
    <>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="p-5 flex flex-col gap-3 w-full border-b border-b-gray-300 hover:bg-blue-50"
        >
          <Skeleton className={clsx("h-7 w-1/2", idx % 2 === 0 && "w-2/3")} />
          <div className="flex gap-3">
            <Skeleton className="h-3" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="w-[60px]" />
            <Skeleton className="w-[100px] h-6" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListsSection;
