import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../context/AppContext";

const SearchInput = ({ value }) => {
  const {
    handleInputChange,
    user,
    selectedDirection,
   
  } = useAppContext();

  const search = async (e) => {
    handleInputChange(value, e.target.value);
    
  };

  return (
    <div className="bg-gray-50 flex relative rounded shadow-md">
      <input
        onChange={search}
        type="search"
        placeholder="Search Book"
        className="w-full p-4 text-gray-500  rounded-lg focus:outline-none focus:border-gray-400 focus:bg-white"
      />
      <span className="absolute right-2 top-2 p-3 bg-indigo-400 rounded-full flex justify-center items-center">
        <IoSearch size={20} className="text-white" />
      </span>
    </div>
  );
};

export default SearchInput;
