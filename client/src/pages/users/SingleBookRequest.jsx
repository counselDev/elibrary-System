import { format } from "date-fns";
import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import CustomHeader from "../../components/CustomHeader";
import BookingInfo from "../../components/BookingInfo";
import { useAppContext } from "../../context/AppContext";

const SingleBookRequest = () => {
  const { singleBookRequest, getSingleBookRequest } = useAppContext();
  const { bookingId } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (bookingId) {
        await getSingleBookRequest(bookingId);
      }
    };

    getData();
  }, [bookingId]);

  return (
    <div className="min-h-screen pb-4">
      <CustomHeader title="Single Book Request" />

      {singleBookRequest ? (
        <div className=" px-4">
          <div className="flex flex-col items-center gap-1 my-8">
            <span className="text-sm text-gray-400 font-semibold">
              Book Infomation
            </span>
            <div className="rounded-full overflow-hidden h-24 w-24  border-2 border-indigo-600 bg-white text-indigo-600 flex items-center justify-center text-3xl font-bold">
              <img
                src={singleBookRequest.book.coverImage}
                className="object-cover w-full h-full"
                alt="book"
              />
            </div>

            <h3 className="font-semibold text-lg">{singleBookRequest.book.title}</h3>
            <span>{singleBookRequest.book.author}</span>
          </div>

          <BookingInfo singleBookRequest={singleBookRequest} />
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default SingleBookRequest;
