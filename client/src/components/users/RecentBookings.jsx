import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import Book from "./Booking";

const RecentBookings = () => {
  const { user, userBookRequest, allBookRequest } = useAppContext();
  const [bookRequest, setBookRequest] = useState();

  useEffect(() => {
    if (user.role === "reader") {
      setBookRequest(userBookRequest);
    } else if (allBookRequest && user.role === "admin") {
      setBookRequest(allBookRequest.bookings.slice(0, 4));
    }
  }, [userBookRequest, allBookRequest]);

  return (
    <div className="flex flex-col gap-3">
      {bookRequest ? (
        bookRequest.length > 0 ? (
          bookRequest.map((request) => <Book key={request._id} {...request} />)
        ) : (
          <h3>No Recent Book</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default RecentBookings;
