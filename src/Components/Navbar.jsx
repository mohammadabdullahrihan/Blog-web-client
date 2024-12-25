import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../AuthProvider";
import logo from "/public/logo.svg";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar pt-5">
      <div className="navbar-start">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                  : "px-4 py-2 text-sm font-semibold"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/allblogs"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                  : "px-4 py-2 text-sm font-semibold"
              }
            >
              All Blogs
            </NavLink>

            <NavLink
              to="/featuredblogs"
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                  : "px-4 py-2 text-sm font-semibold"
              }
            >
              Featured Blogs
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/addblog"
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                      : "px-4 py-2 text-sm font-semibold"
                  }
                >
                  Add Blog
                </NavLink>

                <NavLink
                  to="/wishlist"
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-2 text-white text-sm font-semibold rounded-xl bg-black hover:bg-black hover:text-white hover:rounded-xl"
                      : "px-4 py-2 text-sm font-semibold"
                  }
                >
                  Wishlist
                </NavLink>
              </>
            ) : (
              []
            )}
          </ul>
        </div>

        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className=" rounded-full" />
          {/* <div className="text-xl font-bold">
            <Typewriter words={["Chill Gamer"]} loop />
          </div> */}
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/allblogs"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
            }
          >
            All Blogs
          </NavLink>

          <NavLink
            to="/featuredblogs"
            className={({ isActive }) =>
              isActive
                ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
            }
          >
            Featured Blogs
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/addblog"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                    : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
                }
              >
                Add Blog
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  isActive
                    ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                    : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
                }
              >
                Wishlist
              </NavLink>
            </>
          )}
        </ul>
      </div>

      {/* User Actions */}
      <div className="navbar-end flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            {/* User Avatar */}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL || "/default-avatar.png"}
                    alt="User"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="relative bg-gray-100 dropdown-content mt-3 p-4 shadow-lg rounded-box w-[200px]"
              >
                <li>
                  <span className="font-semibold text-xl">
                    {user?.displayName}
                  </span>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Log Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-x-5">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                  : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                  : "px-6 py-4 border border-black transition-all duration-300 ease-in-out rounded-full hover:bg-black hover:text-white"
              }
            >
              Register
            </NavLink>
          </div>
        )}

        {/* Dark/Light Theme Toggle using react-toggle-dark-mode */}
      </div>
    </div>
  );
};

export default Navbar;
