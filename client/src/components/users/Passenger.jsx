import { format } from "date-fns";
import React from "react";

const Passenger = (userInfo) => {
  return (
    <div className="bg-white flex py-2 px-4 gap-3 rounded ">
      <div className=" font-bold text-xl w-12 text-indigo-500  flex gap-1 items-center justify-center border border-indigo-500 rounded-md">
        <span>{userInfo.firstname.slice(0, 1)}</span>
        <span>{userInfo.lastname.slice(0, 1)}</span>
      </div>
      <div className="flex flex-col">
        <h3 className="font-semibold  ">
          {userInfo.firstname} {userInfo.lastname}
        </h3>
        <span className="text-gray-500 text-sm">{userInfo.phone}</span>
      </div>
    </div>
  );
};

export default Passenger;
