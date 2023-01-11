import { IoTime } from "react-icons/io5";
import { RiRestTimeFill } from "react-icons/ri";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Booking = ({ startTime, endTime, status, book, _id }) => {
  const { user } = useAppContext();

  return (
    <Link to={user?.role === "reader" ? `/users/request/${_id}` : `/admin/request/${_id}`}>
      <div className="flex gap-4 justify-between items-center bg-white shadow p-2">
        <div className="flex gap-4 items-center justify-center">
          <img
            src={book.coverImage}
            className="h-16 w-16 rounded object-cover"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-sm text-green-500">
              {book.title}
            </h2>

            <span className="text-gray-500  text-sm font-medium flex gap-2 items-center">
              <IoTime className="text-green-500" />
              {format(new Date(startTime), "EEEE do HH:mm")}
            </span>
            <span className="text-gray-500 text-sm font-medium flex gap-2 items-center">
              <RiRestTimeFill className="text-rose-500" />
              {format(new Date(endTime), "EEEE do HH:mm")}
            </span>
          </div>
        </div>

        <div className="flex gap-1 items-center justify-center">
          <span
            className={`w-2 h-2 flex rounded-full ${
              status === "request"
                ? "bg-green-500"
                : status === "issued"
                ? "bg-blue-500"
                : "bg-rose-500"
            } `}
          ></span>
          <span
            className={`${
              status === "request"
                ? "text-green-500"
                : status === "issued"
                ? "text-blue-500"
                : "text-rose-500"
            } text-sm capitalize `}
          >
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Booking;
