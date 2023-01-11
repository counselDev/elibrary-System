
import RecentBookings from "../users/RecentBookings";


const RecentBookRequest = () => {
  return (
    <div className=" px-8 py-8 bg-white shadow-md">
      <h2 className="mb-3 text-lg font-semibold text-gray-600">Recent Bookings</h2>
      <RecentBookings />
    </div>
  );
};

export default RecentBookRequest;
