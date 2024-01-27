import { Spinner } from "@nextui-org/react";

const Loader = () => {
  return (
    <Spinner
      classNames={{
        base: "w-[20px] h-[20px] md:w-[30px] md:h-[30px]",
        wrapper: "w-[20px] h-[20px] md:w-[30px] md:h-[30px]",
        circle1: "border-b-blue-500",
        circle2: "border-b-blue-500",
      }}
    />
  );
};

export default Loader;
