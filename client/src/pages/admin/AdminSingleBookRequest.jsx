import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { format } from "date-fns";
import { TiTick } from "react-icons/ti";

const AdminSingleBookRequest = () => {
  const {
    singleBookRequest,
    updateBookingStatus,
    getSingleBookRequest,
  } = useAppContext();
  const { bookingId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getSingleBookRequest(bookingId);
    };

    getData();
  }, [bookingId]);

  const getCurrentStatus = (index) => {
    if (singleBookRequest.status === "request") {
      return index === 0 && true;
    } else if (singleBookRequest.status === "issued") {
      return index <= 1 && true;
    } else if (singleBookRequest.status === "due") {
      return index <= 2 && true;
    } else if (singleBookRequest.status === "returned") {
      return index <= 3 && true;
    } else {
      return false;
    }
  };

  const handleChageStatus = async (status) => {
    setLoading(true);
    await updateBookingStatus(singleBookRequest._id, { status: status });
    setLoading(false);
  };

  return (
    <div>
      {singleBookRequest ? (
        <div className="w-full overflow-hidden bg-white shadow sm:rounded-lg">
          <div className="flex items-center justify-between px-4 py-5 sm:px-6">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Booking Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Order ID: {singleBookRequest._id}
              </p>
            </div>

            <div className="flex gap-2">
              {loading && <TailSpin width={30} height={30} />}
              <div className="text-blue-500 bg-white px-4 py-2 flex gap-4 rounded border border-blue-500">
                <div
                  onClick={() => handleChageStatus("request")}
                  className="cursor-pointer flex gap-2 items-center justify-center"
                >
                  <label htmlFor="request">Request</label>
                  <div
                    className={`h-6 w-6 ${
                      getCurrentStatus(0) ? "bg-indigo-100 " : "bg-white"
                    } rounded border border-indigo-500`}
                  >
                    <TiTick
                      size={22}
                      className={
                        getCurrentStatus(0)
                          ? "text-indigo-500 "
                          : "text-gray-300"
                      }
                    />
                  </div>
                </div>
                <div
                  onClick={() => handleChageStatus("issued")}
                  className="cursor-pointer flex gap-2 items-center justify-center"
                >
                  <label htmlFor="issued">Issued</label>
                  <div
                    className={`h-6 w-6 ${
                      getCurrentStatus(1) ? "bg-indigo-100 " : "bg-white"
                    } rounded border border-indigo-500`}
                  >
                    <TiTick
                      size={22}
                      className={
                        getCurrentStatus(1)
                          ? "text-indigo-500 "
                          : "text-gray-300"
                      }
                    />
                  </div>
                </div>
                <div
                  onClick={() => handleChageStatus("due")}
                  className="cursor-pointer flex gap-2 items-center justify-center"
                >
                  <label htmlFor="due">Due</label>
                  <div
                    className={`h-6 w-6 ${
                      getCurrentStatus(2) ? "bg-indigo-100 " : "bg-white"
                    } rounded border border-indigo-500`}
                  >
                    <TiTick
                      size={22}
                      className={
                        getCurrentStatus(2)
                          ? "text-indigo-500 "
                          : "text-gray-300"
                      }
                    />
                  </div>
                </div>
                <div
                  onClick={() => handleChageStatus("returned")}
                  className="cursor-pointer flex gap-2 items-center justify-center"
                >
                  <label htmlFor="returned">Returned</label>
                  <div
                    className={`h-6 w-6 ${
                      getCurrentStatus(3) ? "bg-indigo-100 " : "bg-white"
                    } rounded border  border-indigo-500`}
                  >
                    <TiTick
                      size={22}
                      className={
                        getCurrentStatus(3)
                          ? "text-indigo-500 "
                          : "text-gray-300"
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.user.firstname}{" "}
                  {singleBookRequest.user.lastname}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.user.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Contact
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.user.phone}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Book Title
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.book.title}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Book Author
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.book.author}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Book Publisher
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleBookRequest.book.publisher}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Request Sent At
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {format(
                    new Date(singleBookRequest.createdAt),
                    "do MMM, yyy. k:m"
                  )}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Start Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {format(
                    new Date(singleBookRequest.startTime),
                    "do MMM, yyy. k:m"
                  )}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">End Time</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {format(
                    new Date(singleBookRequest.endTime),
                    "do MMM, yyy. k:m"
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default AdminSingleBookRequest;
