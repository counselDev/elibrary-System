import UserAvatar from "../../assets/images/user.png";
import { AiOutlineLogout } from "react-icons/ai";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  
  const { user, logout } = useAppContext()
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="flex justify-between items-center z-50 ">
      <div className="flex items-center justify-center gap-2">
        <img src={UserAvatar} alt="User" className="w-10 h-10 object-contain" />

        <div className="flex flex-col">
          <span className=" text-sm text-gray-500">Welcome!</span>
          <span className="font-semibold text-base text-blue-900">
            {user && `${user.firstname} ${user.lastname}`}
           
          </span>
        </div>
      </div>

      <span className="bg-white p-2 rounded-full ">
      <AiOutlineLogout
        onClick={handleLogout}
        size={22}
        className="text-rose-400 cursor-pointer"
      />
      </span>
    </div>
  );
};

export default Header;
