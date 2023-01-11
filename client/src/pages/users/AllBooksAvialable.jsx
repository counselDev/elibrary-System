import React, { useEffect } from "react";
import CustomHeader from "../../components/CustomHeader";
import AvialableBooks from "../../components/users/AvialableBooks";
import { useAppContext } from "../../context/AppContext";

const AllBooksAvialable = () => {
  const { getBooks, allBooks } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getBooks();
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen pb-4">
      <CustomHeader title="Avialable Books" />

      <div className=" px-4 py-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-600">
          Avialable Books
        </h2>
        <AvialableBooks />
      </div>
    </div>
  );
};

export default AllBooksAvialable;
