import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import * as ACTIONS from "../context/actions";
import { TailSpin } from "react-loader-spinner";

const initState = {
  firstname: "",
  lastname: "",
  password: "",
  phone: "",
  gender: "",
  email: "",
};

const Register = () => {
  const {
    register,
    isLoading,
    errorMessage,
    dispatch,
    clearMessage,
  } = useAppContext();
  const [input, setInput] = useState(initState);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { firstname, lastname, phone, gender, password, email } = input;

      if (!firstname || !lastname | !phone || !gender || !password || !email) {
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { msg: "Please input all Fields" },
        });
        return;
      }

      const res = await register(input);

      if (res) {
        setInput(initState);
        navigate("/users");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.message },
      });
    }
  };

  return (
    <div className="w-full min-h-screen py-6 flex items-center justify-center bg-gray-100">
      <div className="w-2/6">
        <h3 className="mb-5 text-2xl font-semibold  text-gray-500 text-center">
          Register Here!
        </h3>
        {errorMessage ? (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded flex items-center justify-between gap-4"
            role="alert"
          >
            <strong className="font-bold">{errorMessage}!</strong>

            <span className="px-4 py-2" onClick={clearMessage}>
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ) : null}
        <form
          className="bg-white  shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
              name="firstname"
              placeholder="firstname"
              value={input.firstname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
              name="lastname"
              value={input.lastname}
              onChange={handleInputChange}
              placeholder="lastname"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="gender"
              name="gender"
              value={input.gender}
              onChange={handleInputChange}
            >
              <option>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Phone
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
              autoComplete="email"
              placeholder="your email"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleInputChange}
              placeholder="**********"
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password above 6 charaters.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-indigo-500 disabled:bg-indigo-300  flex items-center justify-center gap-2 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              Register
              {isLoading && <TailSpin height={20} width={20} />}
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Login here
            </Link>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          &copy;FUTO. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
