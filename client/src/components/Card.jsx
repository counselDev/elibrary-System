import React from "react";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Card = () => {
  const { userBookRequest, issuedBookRequest } = useAppContext();
  return (
    <div className="flex gap-4">
      <div className="flex px-4 py-6 w-full text-white rounded-xl bg-indigo-500">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm">Book Request Made</span>
          <h3 className="font-bold text-3xl">{userBookRequest?.length}</h3>
        </div>
      </div>
      <div className="flex px-4 py-6 w-full text-white rounded-xl bg-indigo-500">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-sm">Book Issued</span>
          <h3 className="font-bold text-3xl">{issuedBookRequest?.length}</h3>
        </div>
      </div>
    </div>
  );
};

export default Card;
