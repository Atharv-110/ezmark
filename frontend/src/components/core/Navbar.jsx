import PropTypes from 'prop-types';
import { logout } from "../../services/auth-service";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Navbar = ({ role, name, email }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="fixed z-10 w-[96%] lg:w-[94%] rounded-md mx-auto h-[65px] top-0 left-0 right-0 mt-3 md:mt-5 px-3 md:px-6 flex-between items-center shadow-md navbar_glass">
      <div className="flex-center gap-1">
        <img src="/images/logo.png" alt="" className="w-12" />
        <h1 className="md:text-2xl tracking-wide font-bold capitalize">
          {role}
        </h1>
      </div>
      <div className="flex-center gap-2">
        <div className="flex items-center gap-2 max-sm:border-l-2 pl-2 md:border-r-2 pr-2">
          {name ? <button className="btn text-lg px-3 py-1 font-semibold uppercase">
            {name.substring(0, 1)}
          </button> : <Loader />}
          
          <button
            onClick={handleLogout}
            className="md:hidden btn_bordered p-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
          </button>
          <div className="hidden md:block">
            <p className="font-medium text-xs">{name}</p>
            <p className="text-xs">{email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="hidden md:block btn_bordered p-1.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  role: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string,
};

export default Navbar;
