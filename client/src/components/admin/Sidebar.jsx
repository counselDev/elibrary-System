import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiUsers } from "react-icons/hi";
import { IoMdPower } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { BiBookOpen, BiListUl } from "react-icons/bi";
import {  AiOutlineHome, AiOutlineUserAdd } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";

const Sidebar = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className=" h-full bg-indigo-900">
      <div className=" border-b h-16 py-10 flex justify-around items-center">
        <p className="text-white font-bold text-xl">Administrator</p>
      </div>
      <div className="p-4 space-y-14">
        <div className="space-y-2">
          <h1 className="text-white">Menu</h1>
          <div className="">
            <Link
              to="/admin"
              className="flex p-3 items-center text-gray-700 space-x-4 0 hover:bg-indigo-400 hover:text-blue-600 cursor-pointer"
            >
              <AiOutlineHome size={24} className="text-white" />
              <span className="text-white  ">Dashboard</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/users"
              className="flex p-3 text-gray-700 space-x-4 0 hover:bg-indigo-400 hover:text-blue-600 cursor-pointer"
            >
              <ImUsers size={24} className="text-white" />
              <span className="text-white  ">Users</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/books"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <HiUsers size={24} className="text-white" />
              <span className="text-white">Books</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/requests"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <BiBookOpen size={24} className="text-white" />
              <span className="text-white">Bookings</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/categories"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <BiListUl size={24} className="text-white" />
              <span className="text-white">Categories</span>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-white">Add</h1>
          <div className="">
            <Link
              to="/admin/add-book"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <AiOutlineUserAdd size={24} className="text-white" />
              <span className="text-white  ">New Book</span>
            </Link>
          </div>
          <div className="">
            <Link
              to="/admin/add-category"
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <IoAdd size={24} className="text-white" />
              <span className="text-white  ">New Category</span>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="">
            <div
              onClick={handleLogout}
              className="flex p-3 text-gray-700  space-x-4 0 hover:bg-indigo-400 hover:text-blue-600  cursor-pointer  "
            >
              <IoMdPower size={24} className="text-white" />
              <span className="text-white  ">Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
