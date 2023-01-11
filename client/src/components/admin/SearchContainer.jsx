import React, { useEffect } from "react";
import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../../context/AppContext";


const SearchContainer = () => {
  const {
    isLoading,
    search,

    sort,
    sortOptions,
    clearFilters,
    handleInputChange,
    getDepartment,
    usersStats,
    getusersStats,
  } = useAppContext();

  useEffect(() => {
    getDepartment();
    getusersStats();
  }, []);

  const handleSearch = (e) => {
    if (isLoading) return;
    let name = e.target.name;
    let value = e.target.value;
    handleInputChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <div className=" flex flex-wrap w-full">
      <form className="w-full mb-8">
        <h4 className="text-xl text-gray-600 mb-3">Search form</h4>
        <div className="form-center">
          {/* Search input */}
          <FormRow
            type="text"
            name="search"
            value={search}
            handleChange={handleSearch}
          />

          {/* Search by Entry Year*/}
          {true && (
            <FormRowSelect
              labelText="Entry Year"
              name="searchEntryYear"
              value={searchEntryYear}
              handleChange={handleSearch}
              list={[1, 3, 4, 6]}
            />
          )}

          {/* Sort */}
          <FormRowSelect
            labelText="Sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="w-3/4 h-10 mt-6 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-1 px-2 border border-red-500 hover:border-transparent rounded"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchContainer;
