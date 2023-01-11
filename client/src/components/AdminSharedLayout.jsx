import React from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import AdminHeader from "./admin/AdminHeader"
import Sidebar from "./admin/Sidebar";

const AdminSharedLayout = () => {
  const { errorMessage, clearMessage, successMessage } = useAppContext();
  return (
    <div className="flex spacing-x-4 min-h-screen ">
      <div className="w-2/12 hidden md:block ">
        <Sidebar />
      </div>
      <div className="w-full md:w-10/12 bg-gray-100  ">
        <AdminHeader />
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded fixed top-12 right-12 flex items-center justify-between gap-4"
            role="alert"
          >
            <strong className="font-bold">{errorMessage}!</strong>

            <span className="px-4 py-3" onClick={clearMessage}>
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
        )}

        {successMessage && (
          <div
            className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 fixed top-12 right-12 shadow-md"
            role="alert"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold">{successMessage}</p>
              <span className="px-4 py-3" onClick={clearMessage}>
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
          </div>
        )}
        <div className="py-4 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminSharedLayout;
