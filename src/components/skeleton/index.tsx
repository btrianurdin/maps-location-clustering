import clsx from "clsx";

interface ISkeletonProps {
  className?: string;
}

const Skeleton = (props: ISkeletonProps) => {
  return (
    <div
      className={clsx(
        "w-24 h-3 rounded-md bg-gray-300 animate-pulse",
        props.className
      )}
    />
  );
};

export default Skeleton;
