import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./components/SharedLayout";
import UserHome from "./pages/users/UserHome";
import SingleBookRequest from "./pages/users/SingleBookRequest";
import SingleBook from "./pages/users/SingleBook";
import AllUserBookRequest from "./pages/users/AllUserBookRequest";
import AllUsers from "./pages/admin/AllUsers";
import AllBooks from "./pages/admin/AllBooks";
import AllBookings from "./pages/admin/AllBookings";
import AdminSingleBookRequest from "./pages/admin/AdminSingleBookRequest";
import Dashboard from "./pages/admin/Dashboard";
import AdminSharedLayout from "./components/AdminSharedLayout";
import AddBook from "./pages/admin/AddBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import AdminProtectedRoute from "./routes/AdminProtectedRoute";
import UserRedirect from "./routes/UserRedirect";
import UserProtectedRoute from "./routes/UserProtectedRoute";
import AllBooksAvialable from "./pages/users/AllBooksAvialable";
import AddCategory from "./pages/admin/AddCategory";
import AllCategories from "./pages/admin/AllCatogories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/users"
          element={
            <UserProtectedRoute>
              <SharedLayout />
            </UserProtectedRoute>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="book" element={<SingleBook />} />
          <Route path="avialable" element={<AllBooksAvialable />} />
          <Route path="all-request" element={<AllUserBookRequest />} />
          <Route path=":bookId" element={<SingleBook />} />
          <Route path="request/:bookingId" element={<SingleBookRequest />} />
        </Route>
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminSharedLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<AllUsers />} />
          <Route path="books" element={<AllBooks />} />
          <Route path="add-book" element={<AddBook />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="requests" element={<AllBookings />} />
          <Route path="categories" element={<AllCategories />} />
          <Route
            path="request/:bookingId"
            element={<AdminSingleBookRequest />}
          />
        </Route>
        <Route path="/" element={<Landing />} />
        <Route
          path="/login"
          element={
            <UserRedirect>
              <Login />
            </UserRedirect>
          }
        />
        <Route
          path="/register"
          element={
            <UserRedirect>
              <Register />
            </UserRedirect>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
