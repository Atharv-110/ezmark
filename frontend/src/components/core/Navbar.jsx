import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white px-8 py-4 flex-between shadow-md">
      <h1 className="text-2xl tracking-wide font-bold">Admin Dashboard</h1>
      <div className="flex items-center gap-2 border-l-2 pl-2">
        <h2 className="w-[50px] h-[50px] flex items-center justify-center text-[30px] font-bold border-2 rounded-full btn">
          A
        </h2>
        <div className="leading-none">
          <p className="font-medium">Admin Name</p>
          <p className="text-sm">Admin Email</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
