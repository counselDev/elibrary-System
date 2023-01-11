import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import Booking from "../../components/users/Booking";
import Header from "../../components/users/Header";
import AvialableBooks from "../../components/users/AvialableBooks";
import { useAppContext } from "../../context/AppContext";

const UserHome = () => {
  const {
    getUserBookRequests,
    userBookRequest,
    issuedBookRequest,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getUserBookRequests();
    };

    getData();
  }, []);

  return (
    <div className="py-8 px-4 min-h-screen">
      <Header />

      {userBookRequest ? (
        <>
          <div className="my-8">
            <Card />
          </div>

          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-600">
              Book Requests
            </h2>

            {userBookRequest ? (
              userBookRequest.length > 0 ? (
                userBookRequest.map((request) => (
                  <div key={request._id} className="mb-2">
                    <Booking
                      user
                      startTime={request.startTime}
                      endTime={request.endTime}
                      status={request.status}
                      book={request.book}
                      _id={request._id}
                    />
                  </div>
                ))
              ) : (
                <h3 className="font-semibold">No Current Book Request</h3>
              )
            ) : (
              <TailSpin />
            )}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center">
              <h2 className="mb-3 text-sm font-semibold text-gray-600">
                Avialable Books
              </h2>
              <Link
                className="text-sm font-light text-indigo-500"
                to="/users/avialable"
              >
                All Books
              </Link>
            </div>
            <AvialableBooks />
          </div>
        </>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default UserHome;
