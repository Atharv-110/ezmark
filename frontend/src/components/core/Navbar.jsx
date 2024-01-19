
const Navbar = () => {
  return (
    <nav className="fixed z-10 w-[96%] lg:w-[94%] rounded-md mx-auto h-[60px] top-0 left-0 right-0 mt-5 px-2 md:px-8 py-3 flex-between shadow-md navbar_glass">
      <h1 className="md:text-2xl tracking-wide font-bold capitalize">
        {localStorage.getItem("role")} <span className="hidden md:inline">Dashboard </span>
      </h1>
      <div className="flex items-center gap-2 border-l-2 pl-3">
        <h2 className="btn p-0 w-[25px] h-[25px] md:w-[35px] md:h-[35px] flex items-center justify-center md:text-[1.5rem] leading-none font-bold border-2 rounded-full">
          A
        </h2>
        <div className="leading-none">
          <p className="font-medium text-sm">Dummy</p>
          <p className="text-xs">dummy@gmail.com</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
