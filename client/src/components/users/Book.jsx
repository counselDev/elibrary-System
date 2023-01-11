import { RiRestTimeFill } from "react-icons/ri";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

const Book = ({
  author,
  title,
  yearPublished,
  publisher,
  coverImage,
  status,
  _id,
}) => {
  const { user } = useAppContext();

  return (
    <Link to={user?.role === "user" ? `/user/${_id}` : `/users/${_id}`}>
      <div className="flex gap-4 justify-between items-center bg-white shadow p-2">
        <div className="flex gap-1 items-center justify-center">
          <img src={coverImage} className="h-16 w-16 rounded object-cover" />

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-sm text-green-500">{title}</h2>

            <p className="text-gray-500 text-sm flex gap-2">
              Author: {" "}
               <span className="font-semibold">{author}</span>
            </p>
            <p className="text-gray-500 text-sm flex gap-2">
              Publisher: {" "}
               <span className="font-semibold">{publisher}</span>
            </p>
          </div>
        </div>

        <div className="flex gap-1 items-center justify-center">
          <span
            className={`w-2 h-2 flex rounded-full ${
              status === "avialable" ? "bg-green-500" : "bg-rose-500"
            } `}
          ></span>
          <span
            className={`${
              status === "avialable" ? "text-green-500" : "text-rose-500"
            } text-sm capitalize `}
          >
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default Book;
