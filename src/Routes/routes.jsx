import { createBrowserRouter } from "react-router-dom";
import Main from "../MainLayout/Main";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import PrivateRoute from "../PrivateRoute";
import ErrorPage from "../Components/ErrorPage";
import UpdateReview from "../Pages/UpdateReview";
import MyWatchlist from "../Pages/MyWatchlist";
import AddBlog from "../Pages/AddBlog";
import AllBlogs from "../Pages/AllBlogs";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import BlogDetails from "../Pages/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/updatereview/:id",
        element: (
          <PrivateRoute>
            <UpdateReview />
          </PrivateRoute>
        ),
      },
      
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <MyWatchlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/addblog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/allblogs",
        element: <AllBlogs />,
      },
      {
        path: "/updateblog/:id",
        element: <UpdateReview />,
      },
      {
        path: "/featuredblogs",
        element: <FeaturedBlogs />,
      },
      {
        path: "/blogdetails",
        element: <FeaturedBlogs />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
