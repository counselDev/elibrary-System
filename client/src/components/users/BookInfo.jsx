import React from "react";
import { format } from "date-fns";

const BookInfo = ({ singleBook }) => {
  return (
    <div className="bg-white rounded-md shadow px-1 py-8 flex flex-col gap-2">
      <h2 className="text-center font-semibold  text-gray-400 mb-4">Details</h2>

      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between flex-wrap items-center mb-6">
          <div className="flex flex-col items-center justify-center gap-1 ">
            <span className="font-semibold text-base text-center">
              {singleBook.publisher}
            </span>
            <span className="text-xs text-gray-400">Publisher</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="font-semibold text-base text-center">
              {format(new Date(singleBook.yearPublished), "do EEEE, yyy")}
            </span>
            <span className="text-xs text-gray-400">Year Published</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex gap-1 items-center justify-center ">
              <span
                className={`w-2 h-2 flex rounded-full ${
                  singleBook.status === "avialable"
                    ? "bg-green-500"
                    : "bg-rose-500"
                } `}
              ></span>
              <span
                className={`${
                  singleBook.status === "avialable"
                    ? "text-green-500"
                    : "text-rose-500"
                } text-sm capitalize `}
              >
                {singleBook.status}
              </span>
            </div>
            <span className="text-xs text-gray-400">Status</span>
          </div>
        </div>

        <div className="flex gap-4 px-4">
          <div className="flex flex-col flex-wrap items-center">
            <span className="font-semibold">
              {format(new Date(singleBook.createdAt), "EEEE do HH:mm")}
            </span>
            <span className="text-xs text-gray-400"> Book Added At</span>
          </div>
          <div className="flex flex-col items-center justify-center  ">
            <span className="font-semibold text-base text-center">
              {singleBook.copies}
            </span>
            <span className="text-xs text-gray-400">Copies Avialable</span>
          </div>
          <div className="flex flex-col items-center justify-center  ">
            <span className="font-semibold text-base text-center">
              {singleBook.category.title}
            </span>
            <span className="text-xs text-gray-400">Category</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
