import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";
import Book from "./Book";

const AvialableBooks = () => {
  const { getBooks, allBooks } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getBooks();
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {allBooks ? (
        allBooks.books.length > 0 ? (
          allBooks.books.map((book) => <Book key={book._id} {...book} />)
        ) : (
          <h3>No Book Avialable</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default AvialableBooks;
