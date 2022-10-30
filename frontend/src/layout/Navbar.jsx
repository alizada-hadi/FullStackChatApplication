import React from "react";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-gray-50 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="https://flowbite.com/" className="flex items-center">
          <span className="self-center text-xl font-semibold font-Inter text-gray-800 whitespace-nowrap dark:text-white">
            DjChat
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className="hidden w-full md:block md:w-auto text-gray-800"
          id="navbar-default"
        >
          <ul className="flex flex-col items-center p-4 mt-4 text-gray-800 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-medium md:border-0 md:bg-gray-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pr-4 pl-3 font-Inter text-xl text-gray-800 bg-blue-700 rounded md:bg-transparent md:white md:p-0 dark:text-gray-800"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/conversations"}
                className="block py-2 pr-4 pl-3 text-gray-800 text-xl font-Inter rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-200 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Conversations
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <button
                    onClick={logoutHandler}
                    className="block py-2 pr-4 pl-3 text-xl font-Inter text-gray-800 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-2 md:hover:text-gray-900 md:hover:bg-white md:p-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:text-white  md:dark:hover:bg-transparent"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"/signup"}
                    className="block py-2 pr-4 pl-3 text-gray-800 text-xl rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-2 md:hover:text-gray-900 md:hover:bg-white md:p-3 dark:text-gray-400 md:dark:hover:text-white dark:hover:text-white  md:dark:hover:bg-transparent"
                  >
                    Sign In/Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
