import React from "react";
import CustomHeader from "../../components/CustomHeader";
import RecentBookings from "../../components/users/RecentBookings";

const AllUserBookRequest = () => {
  return (
    <div className="min-h-screen">
      <CustomHeader title="All Bookings" />

      <div className=" px-4 py-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-600">
          All Bookings
        </h2>
        <RecentBookings />
      </div>
    </div>
  );
};

export default AllUserBookRequest;
