import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import SearchInput from "../../components/SearchInput";
import { useAppContext } from "../../context/AppContext";

const AllBooks = () => {
  const { getBooks, searchBook, allBooks } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getBooks();
    };

    getData();
  }, [searchBook]);
  return (
    <div className="sm:p-10">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">All Books</h1>
        <h2 className="text-gray-600 ml-0.5">List of all Books</h2>
      </div>

      <div className="mt-0 py-4 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
        <div className="w-1/2 px-6">
          <SearchInput value="searchBook" />
        </div>
        {allBooks ? (
          <div className="my-0  px-2 py-4">
            <div className="flex items-center justify-between mb-5"></div>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-sm text-blue-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="py-5 px-3">
                    S/N
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Cover Image
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Title
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Author
                  </th>

                  <th scope="col" className="py-5 px-3">
                    Published By
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Published Year
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Book Status
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Category
                  </th>
                  <th scope="col" className="py-5 px-3">
                    Copies
                  </th>
                </tr>
              </thead>
              <tbody>
                {allBooks.books.length === 0 ? (
                  <tr className="text-center font-bold text-xl py-4 px-3">
                    <td colSpan={5} className="py-4 px-3">
                      No Books Yet
                    </td>
                  </tr>
                ) : (
                  allBooks.books.map((item, index) => (
                    <tr key={item._id} className="bg-white border-b">
                      <td className="py-4 px-3">{index + 1}</td>

                      <td className="py-4 px-3">
                        <img
                          src={item.coverImage}
                          alt={item.title}
                          className="h-16 rounded overflow-hidden"
                        />
                      </td>
                      <td className="py-4 px-3">{item.title}</td>

                      <td className="py-4 px-3">{item.author}</td>
                      <td className="py-4 px-3">{item.publisher}</td>
                      <td className="py-4 px-3">
                        {format(new Date(item.yearPublished), "do MMM, yyy")}
                      </td>

                      <td className="py-4 px-3">{item.status}</td>
                      <td className="py-4 px-3">{item.category.title}</td>
                      <td className="py-4 px-3">{item.copies}</td>
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

export default AllBooks;
