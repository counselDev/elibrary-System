import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader";
import BookInfo from "../../components/users/BookInfo";
import { useAppContext } from "../../context/AppContext";

const init = {
  startTime: "",
  endTime: "",
};

const SingleBook = () => {
  const { getSingleBook, requestBook, unRequestBook } = useAppContext();
  const [singleBook, setSingleBook] = useState();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState(init);
  const { bookId } = useParams();

  useEffect(() => {
    const getData = async () => {
      setSingleBook(await getSingleBook(bookId));
    };

    getData();
  }, []);

  const handleMakeRequest = async () => {
    setLoading(true);
    let payload = { ...input, bookId: singleBook._id };
    await requestBook(payload);
    setLoading(false);
  };

  const handleRemoveRequest = async () => {
    setLoading(true);
    await unRequestBook(singleBook._id);
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({ ...input, [name]: value });
  };

  return (
    <div className="min-h-screen pb-4">
      <CustomHeader title="Single Book" />

      {singleBook ? (
        <div className=" px-4">
          <div className="flex flex-col items-center gap-1 my-8">
            <span className="text-sm text-gray-400 font-semibold">
              Book Infomation
            </span>
            <div className="rounded-full overflow-hidden h-24 w-24  border-2 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
              <img
                src={singleBook.coverImage}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-semibold text-lg">{singleBook.title}</h3>
            <span>{singleBook.author}</span>
          </div>

          <BookInfo singleBook={singleBook} />

          <div className="bg-white rounded-md shadow px-4 py-4 mt-6 flex flex-col gap-2">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="startTime"
              >
                Start Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="startTime"
                type="datetime-local"
                name="startTime"
                value={input.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="endTime"
              >
                End Time
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="endTime"
                type="datetime-local"
                name="endTime"
                value={input.endTime}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              disabled={loading || singleBook.status === "available"}
              onClick={
                singleBook.bookRequested
                  ? handleRemoveRequest
                  : handleMakeRequest
              }
              className={`mt-5 disabled:bg-indigo-200 disabled:cursor-not-allowed tracking-wide font-semibold ${
                singleBook.bookRequested ? "bg-rose-400" : " bg-indigo-500"
              } text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex gap-4 items-center justify-center focus:shadow-outline focus:outline-none`}
            >
              <IoMdCheckmarkCircleOutline size={22} />
              <span className="ml-3">
                {singleBook.bookRequested ? "Unrequest Book" : "Request Book"}
              </span>
              {loading && <TailSpin height="30" width="30" />}
            </button>
          </div>
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default SingleBook;
