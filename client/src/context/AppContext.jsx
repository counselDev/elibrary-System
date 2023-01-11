import axios from "axios";
import { useContext, createContext, useReducer } from "react";
import reducer from "./reducer";
import * as ACTIONS from "./actions";

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

export const initialState = {
  user: user || null,
  token: token || null,
  allBooks: null,
  allBookRequest: null,
  allUsers: null,
  allCategories: null,
  userBookRequest: null,
  issuedBookRequest: null,
  dueBookings: null,
  driverCurrentBooking: null,
  singleBookRequest: null,
  driverBookings: null,
  selectedDirection: "",
  numOfPages: 1,
  page: 1,
  cardStats: null,
  monthlyStats: null,
  searchUser: "",
  searchBook: "",
  sort: "latest",
  sortOptions: [
    { _id: "latest" },
    { _id: "oldest" },
    { _id: "a-z" },
    { _id: "z-a" },
  ],
  errorMessage: "",
  successMessage: "",
  isLoading: false,
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //Instance Setup
  const authFetch = axios.create({
    baseURL: "/api/",
  });

  //request Interceptor
  authFetch.interceptors.request.use(
    (config) => {
      dispatch({ type: ACTIONS.FETCH_START });
      config.headers.Authorization = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return Promise.reject(error);
    }
  );

  authFetch.interceptors.response.use(
    (response) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      return response;
    },
    (error) => {
      dispatch({ type: ACTIONS.FETCH_STOP });
      const err = error?.response;
      console.log(error);

      if (err?.status === 401 || err?.status === 500) {
        logout();
        dispatch({ type: ACTIONS.INIT_STATE });
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const getUsers = async () => {
    try {
      const { searchUser, sort, page } = state;
      let url = `/users?sort=${sort}&page=${page}`;
      if (searchUser) {
        url = url + `&search=${searchUser}`;
      }
      const res = await authFetch.get(url);
      dispatch({ type: ACTIONS.SET_USERS, payload: { allUsers: res.data } });

      return res.data;
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };
  const getBooks = async () => {
    try {
      const { searchBook, sort, page } = state;
      let url = `/books?sort=${sort}&page=${page}`;
      if (searchBook) {
        url = url + `&search=${searchBook}`;
      }
      const res = await authFetch.get(url);
      dispatch({
        type: ACTIONS.SET_BOOKS,
        payload: { allBooks: res.data },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      handleErrorMsg(error?.response?.data?.msg);
    }
  };
  const getCategories = async () => {
    try {
      const res = await authFetch.get(`/category`);
      dispatch({
        type: ACTIONS.SET_CATEGORIES,
        payload: { allCategories: res.data },
      });

      return res.data;
    } catch (error) {
      console.log(error);
      handleErrorMsg(error?.response?.data?.msg);
    }
  };
  const getBookRequest = async () => {
    try {
      const { searchBook, sort, page } = state;
      let url = `/request-book?sort=${sort}&page=${page}`;
      if (searchBook) {
        url = url + `&search=${searchBook}`;
      }
      const res = await authFetch.get(url);
      dispatch({
        type: ACTIONS.SET_BOOK_REQUEST,
        payload: { allBookRequest: res.data },
      });

      return res.data;
    } catch (error) {
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const addBook = async (payload) => {
    try {
      const res = await authFetch.post(`/books/`, payload);

      handleMessage("Book Added Successfully");
      await getBooks();
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };
  
  const addCategory = async (payload) => {
    try {
      const res = await authFetch.post(`/category/`, payload);

      handleMessage("Category Added Successfully");
      await getCategories();
      return res.data;
    } catch (error) {
      console.log(error)
      handleErrorMsg(error?.response?.data?.msg);
    }
  };

  const getStats = async () => {
    try {
      const { data: cardStats } = await authFetch.get("/stats/");
      const { data: monthlyStats } = await authFetch.get("/stats/monthly");
      dispatch({
        type: ACTIONS.SET_STATS,
        payload: { cardStats, monthlyStats },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const getUserBookRequests = async () => {
    try {
      const res = await authFetch.get("/request-book/user");

      dispatch({
        type: ACTIONS.SET_USER_REQUEST,
        payload: {
          userBookRequest: res.data.bookRequest,
          issuedBookRequest: res.data.issuedBookRequest,
        },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const getSingleBookRequest = async (_id) => {
    try {
      const res = await authFetch.get(`/request-book/${_id}`);

      dispatch({
        type: ACTIONS.SET_SINGLE_REQUEST,
        payload: { singleBookRequest: res.data },
      });
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };
  const getSingleBook = async (_id) => {
    try {
      const res = await authFetch.get(`/books/${_id}`);

      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const requestBook = async (payload) => {
    try {
      const { bookId, startTime, endTime } = payload;
      if (!bookId || !startTime || !endTime) {
        handleErrorMsg("Please Enter all Fields");
        return;
      }
      const res = await authFetch.post(`/request-book/`, payload);

      await getUserBookRequests();
      await getSingleBook(bookId);
      handleMessage(" Book Request Successfull ");
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const unRequestBook = async (bookId) => {
    try {
      if (!bookId) {
        handleErrorMsg("Please Provide bookId");
        return;
      }
      const res = await authFetch.delete(`/request-book/${bookId}`);

      handleMessage(res.data.msg);
      await getUserBookRequests();
      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const updateBookingStatus = async (tripId, payload) => {
    try {
      const res = await authFetch.patch(`/request-book/${tripId}`, payload);

      await getSingleBookRequest(tripId);

      handleMessage("Booking Update Successfull ");

      return res.data;
    } catch (error) {
      handleErrorMsg(error.response.data.msg);
    }
  };

  const login = async (data) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const res = await axios.post("/api/auth/login", data);
      const { user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.FETCH_STOP });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });
      handleErrorMsg(error.response.data.msg);
    }
  };
  const register = async (data) => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });
      const res = await axios.post("/api/auth/register", data);
      const { user, token } = res.data;

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user,
          token,
        },
      });

      addUserToLocalStorage({ user, token });
      dispatch({ type: ACTIONS.FETCH_STOP });
      return user;
    } catch (error) {
      dispatch({ type: ACTIONS.FETCH_STOP });
      handleErrorMsg(error.response.data.msg);
    }
  };

  const logout = () => {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  };

  const handleInputChange = (name, value) => {
    dispatch({ type: ACTIONS.HANDLE_CHANGE, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: ACTIONS.CLEAR_FILTERS });
  };

  const clearMessage = () => {
    dispatch({ type: ACTIONS.CLEAR_MESSAGE });
  };

  const handleMessage = (message) => {
    dispatch({
      type: ACTIONS.SUCCESS_MSG,
      payload: { successMessage: message },
    });
    setInterval(() => {
      clearMessage();
    }, 10000);
  };

  const handleErrorMsg = (message) => {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: { msg: message },
    });
    setInterval(() => {
      clearMessage();
    }, 10000);
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        dispatch,
        getUsers,
        getBooks,
        getBookRequest,
        getStats,
        addBook,
        addCategory,
        getCategories,
        getUserBookRequests,
        getSingleBookRequest,
        getSingleBook,
        requestBook,
        unRequestBook,
        updateBookingStatus,
        login,
        register,
        logout,
        clearMessage,
        clearFilters,
        handleInputChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
