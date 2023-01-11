import { format } from "date-fns";

const BookingInfo = ({ singleBookRequest }) => {
  return (
    <div className="bg-white rounded-md shadow px-1 py-8 flex flex-col gap-2">
      <h2 className="text-center font-semibold  text-gray-400 mb-4">Details</h2>

      <div className="flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center justify-center gap-1 ">
            <span className="font-semibold text-base text-center">
              {singleBookRequest.book.publisher}
            </span>
            <span className="text-xs text-gray-400">Publisher</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="font-semibold text-base text-center">
              {format(
                new Date(singleBookRequest.book.yearPublished),
                "do EEEE, yyy"
              )}
            </span>
            <span className="text-xs text-gray-400">Year Published</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-1">
            <div className="flex gap-1 items-center justify-center ">
              <span
                className={`w-2 h-2 flex rounded-full ${
                  singleBookRequest.status === "request"
                    ? "bg-indigo-500"
                    : singleBookRequest.status === "issued"
                    ? "bg-yellow-500"
                    : "bg-rose-500"
                } `}
              ></span>
              <span
                className={`${
                  singleBookRequest.status === "request"
                    ? "text-indigo-500"
                    : singleBookRequest.status === "issued"
                    ? "text-yellow-500"
                    : "text-rose-500"
                } text-sm capitalize `}
              >
                {singleBookRequest.status}
              </span>
            </div>
            <span className="text-xs text-gray-400">Status</span>
          </div>
        </div>

        <div className="flex gap-4 px-4">
          <div className="flex flex-col items-center">
            <span className="font-semibold">
              {format(
                new Date(singleBookRequest.book.createdAt),
                "EEEE do HH:mm"
              )}
            </span>
            <span className="text-xs text-gray-400"> Book Added At</span>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <span className="font-semibold text-base text-center">
              {singleBookRequest.book.copies}
            </span>
            <span className="text-xs text-gray-400">Copies Avialable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo;
