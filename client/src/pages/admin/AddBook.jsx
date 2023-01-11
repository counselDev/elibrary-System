import axios from "axios";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as ACTIONS from "../../context/actions";
import { addBookValidator } from "../../lib/formValidator";
import { useAppContext } from "../../context/AppContext";
import { TailSpin } from "react-loader-spinner";

const initState = {
  title: "",
  author: "",
  publisher: "",
  yearPublished: "",
  copies: "",
};

const AddBook = () => {
  const [bookImage, setBookImage] = useState("");
  const [selection, setSelection] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch, getCategories, allCategories, addBook } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getCategories();
    };
    getData();
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    if (!bookImage) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: "Please specify an image",
      });
    }
    setLoading(true);
    const bookImageData = new FormData();
    bookImageData.append("file", bookImage);
    bookImageData.append("upload_preset", "upload");

    try {
      const bookUploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/counselokpabi/image/upload",
        bookImageData
      );

      const { url: bookImageUrl } = bookUploadRes.data;

      const newBook = {
        ...values,
        coverImage: bookImageUrl,
        category: selection,
      };

      const res = await addBook(newBook);

      if (res) {
        resetForm();
        setBookImage("");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { msg: error.message },
      });

      setBookImage("");
    }
  };

  const formik = useFormik({
    initialValues: initState,
    validate: addBookValidator,
    onSubmit: handleSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-xl font-semibold leading-6 text-gray-900">
                Book Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
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
                      {...formik.getFieldProps("title")}
                      autoComplete="given-name"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.errors.title && formik.touched.title ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.title}
                      </span>
                    ) : null}
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      {...formik.getFieldProps("author")}
                      autoComplete="family-name"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.errors.author && formik.touched.author ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.author}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className=" grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="publisher"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Publisher
                    </label>
                    <input
                      type="text"
                      name="publisher"
                      id="publisher"
                      {...formik.getFieldProps("publisher")}
                      autoComplete="publisher"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.errors.publisher && formik.touched.publisher ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.publisher}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="yearPublished"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Year Published
                    </label>
                    <input
                      type="date"
                      {...formik.getFieldProps("yearPublished")}
                      name="yearPublished"
                      id="yearPublished"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.errors.yearPublished &&
                    formik.touched.yearPublished ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.yearPublished}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      onChange={(e) => setSelection(e.target.value)}
                      id="category"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option>Select Category</option>
                      {allCategories &&
                        allCategories.categories.map((item) => (
                          <option key={item.title} value={item._id}>
                            {item.title}
                          </option>
                        ))}
                    </select>
                    {formik.errors.category && formik.touched.category ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.category}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      name="copies"
                      id="copies"
                      {...formik.getFieldProps("copies")}
                      autoComplete="copies"
                      className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    {formik.errors.copies && formik.touched.copies ? (
                      <span className="text-sm text-rose-500">
                        {formik.errors.copies}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image
                  </label>
                  {!bookImage ? (
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="bookImage"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload an Image</span>
                            <input
                              id="bookImage"
                              name="bookImage"
                              type="file"
                              onChange={(e) => setBookImage(e.target.files[0])}
                              className="sr-only"
                            />
                          </label>
                        </div>

                        <p className="text-xs text-gray-500">
                          JPG, JPEG up to 1MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className=" w-full mt-3 flex-1 relative">
                      <div>
                        <img
                          className="flex-1 w-full object-cover "
                          src={URL.createObjectURL(bookImage)}
                        />
                      </div>
                      <svg
                        className="fill-current h-10 w-10 text-red-500 absolute top-4 right-4"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        onClick={() => setBookImage("")}
                      >
                        <title>Remove</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                      </svg>
                    </div>
                  )}
                </div>
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
      </form>
    </div>
  );
};

export default AddBook;
