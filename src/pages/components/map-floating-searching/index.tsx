import clsx from "clsx";

const MapFloatingSearching = ({ loading }: { loading: boolean }) => {
  return (
    <div
      className={clsx(
        "bg-white py-4 px-6 absolute top-5 rounded-full gap-2 text-base left-1/2 -translate-x-1/2 -translate-y-[200px] flex items-center justify-center z-[999]",
        "transition-transform duration-300 ease-in-out",
        {
          "!translate-y-0": loading,
        }
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-loader animate-spin"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6l0 -3" />
        <path d="M16.25 7.75l2.15 -2.15" />
        <path d="M18 12l3 0" />
        <path d="M16.25 16.25l2.15 2.15" />
        <path d="M12 18l0 3" />
        <path d="M7.75 16.25l-2.15 2.15" />
        <path d="M6 12l-3 0" />
        <path d="M7.75 7.75l-2.15 -2.15" />
      </svg>
      Searching...
    </div>
  );
};

export default MapFloatingSearching;
