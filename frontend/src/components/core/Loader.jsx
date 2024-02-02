import PropTypes from 'prop-types';
import { Spinner } from "@nextui-org/react";

const Loader = ({ color }) => {
  return (
    <Spinner
      classNames={{
        base: "w-[20px] h-[20px] md:w-[30px] md:h-[30px]",
        wrapper: "w-[20px] h-[20px] md:w-[30px] md:h-[30px]",
        circle1: `${
          color === "white"
            ? "border-b-2 border-b-primary-white"
            : "border-b-2 border-b-primary-black"
        }`,
        circle2: `${
          color === "white"
            ? "border-b-2 border-b-primary-white"
            : "border-b-2 border-b-primary-black"
        }`,
      }}
    />
  );
};

Loader.propTypes = {
  color: PropTypes.oneOf(["white", "black"]).isRequired,
};

export default Loader;
