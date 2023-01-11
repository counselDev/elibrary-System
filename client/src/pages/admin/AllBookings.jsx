import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../context/AppContext";

const AllBookings = () => {
  const { getBookRequest, searchBook, allBookRequest } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getBookRequest();
    };

    getData();
  }, [searchBook]);

  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Bookings</h1>
        <h2 className="text-gray-600 ml-0.5">List of all Bookings</h2>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput value="searchBook" />
        </div>
        {allBookRequest ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-2">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-2">
                    User Name
                  </th>
                  <th scope="col" className="py-5 px-2">
                    Cover Image
                  </th>
                  <th scope="col" className="py-5 px-2">
                    Book Title
                  </th>
                  <th scope="col" className="py-5 px-2">
                    Book Author
                  </th>
                  <th scope="col" className="py-5 px-2">
                    Start Time
                  </th>

                  <th scope="col" className="py-5 px-2">
                    End Time
                  </th>

                  <th scope="col" className="py-5 px-2">
                    Request Status
                  </th>

                  <th scope="col" className="py-5 px-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBookRequest.bookings.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-2">
                    <td  colSpan={5}  className="py-4 px-2">No Bookings Yet</td>
                  </tr>
                ) : (
                  allBookRequest.bookings.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-2">{index + 1}</td>
                      <td className="py-4 px-2">{item.user.fullname}</td>

                      <td className="py-4 px-2">
                        <img
                          src={item.book.coverImage}
                          alt={item.book.title}
                          className="h-12  rounded-md object-cover overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-2">{item.book.title}</td>
                      <td className="py-4 px-2">{item.book.author}</td>

                      <td className="py-4 px-2">
                        {format(new Date(item.startTime), "EEEE do HH:mm")}
                      </td>
                      <td className="py-4 px-2">
                        {format(new Date(item.endTime), "EEEE do HH:mm")}
                      </td>
                      <td className="py-4 px-2">{item.status}</td>

                      <td className="py-4 px-2">
                        <Link
                          to={`/admin/request/${item._id}`}
                          className="mr-2 font-medium bg-white text-blue-900 p-1 rounded border border-blue-900 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

export default AllBookings;
