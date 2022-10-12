import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const dispatch = useDispatch();
  const submitFormHandler = (e) => {
    const data = { email, username, password, password2 };
    e.preventDefault();
    dispatch(register(data));
  };
  return (
    <div className="max-w-full md:max-w-2xl mx-auto mt-12">
      <div className="border-2 p-8 rounded-lg shadow-inner bg-slate-50">
        <h1 className="text-2xl text-gray-700 font-semibold">Register</h1>
        <div className="mx-4 mt-6">
          <form onSubmit={submitFormHandler}>
            <div>
              <label
                for="email"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="youremail@gmail.com"
                required
              />
            </div>
            <div className="mt-3">
              <label
                for="username"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ali"
                required
              />
            </div>
            <div className="mt-3">
              <label
                for="password"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="*************"
                required
              />
            </div>
            <div className="mt-3 mb-4">
              <label
                for="confirmPassword"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={password2}
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="*************"
                required
              />
            </div>
            <p>
              Already have an account?{" "}
              <Link to={"/signin"} className="text-blue-500 pt-10 ">
                Sign in
              </Link>
            </p>

            <button className="my-3 px-8 py-3 rounded-lg border hover:bg-white">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
