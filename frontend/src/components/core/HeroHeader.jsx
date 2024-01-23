import { Link } from "react-router-dom";

const HeroHeader = () => {
  return (
    <header className="absolute z-10 w-full lg:w-[92%] mx-auto top-0 left-0 right-0 flex-between py-2 px-3 ">
      <div className="flex-center gap-1">
        <img src="/images/logo.png" alt="icon" className="w-12 md:w-12" />
        <h1 className="font-bold tracking-wide text-2xl">ezMark</h1>
      </div>
      <Link to="https://github.com/Atharv-110/ezmark" target="_blank" className="btn_bordered">
        GitHub
      </Link>
    </header>
  );
};

export default HeroHeader;
