import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <section className="md:h-screen flex flex-col md:flex-row justify-center items-center w-full md:w-[90%] mx-auto py-10 px-3">
      <img
        src="/images/bulb.png"
        alt="bulb image"
        className="w-[200px] md:w-fit"
      />
      <div className="max-sm:mt-4 flex justify-center md:justify-normal items-center md:items-start flex-col gap-4 md:gap-10">
        <p className="text-lg">
          <span className="underline underline-offset-8 font-medium">404</span>{" "}
          | Page not Found
        </p>
        <h1 className="text-4xl text-center md:text-left md:text-6xl font-semibold">
          there is <br />
          light in here too
        </h1>
        <p className="text-lg text-center md:text-left">
          But the page is missing or you assembled the link incorrectly
        </p>
        <button onClick={() => navigate("/")} className="w-fit btn">
          Go Home
        </button>
      </div>
    </section>
  );
};

export default PageNotFound;
