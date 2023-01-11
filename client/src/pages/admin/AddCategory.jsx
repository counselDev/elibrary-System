import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../context/AppContext";

const AddCategory = () => {
  const { addCategory } = useAppContext();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { title: input };
    await addCategory(payload);
    setLoading(false);
  };

  return (
    <form onSubmit={handleAddCategory}>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-xl font-semibold leading-6 text-gray-900">
              Add Category
            </h3>
          </div>
        </div>
        <div className="mt-5 md:col-span-2 md:mt-0">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoComplete="given-name"
                    className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6 mt-5 ">
            <div className="md:col-span-1"></div>
            <div className="bg-gray-50 px-4 py-3 md:col-span-2 md:mt-0 flex items-center justify-center sm:px-6">
              <button
                disabled={loading}
                type="submit"
                className="flex gap-3 w-3/4 disabled:bg-indigo-300  justify-center py-2 rounded-md border border-transparent bg-indigo-600 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save
                {loading && <TailSpin width={20} height={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddCategory;
