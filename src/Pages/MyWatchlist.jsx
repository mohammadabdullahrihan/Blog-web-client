import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosSecure from "../useAxiosSecure";

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Fetch wishlist data
  useEffect(() => {
    if (!user?.email) {
      toast.error("User is not authenticated.");
      setLoading(false);
      return;
    }

    axiosSecure
      .get(`/wishlist?userEmail=${user?.email}`, { withCredentials: true })
      .then((response) => {
        setWishlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading wishlist:", error);
        toast.error("Failed to load wishlist. Please try again later.");
        setLoading(false);
      });
  }, [axiosSecure, user?.email]);

  // Remove item from wishlist
  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://blog-web-server-kappa.vercel.app/wishlist/${id}`)
          .then(() => {
            setWishlist((prev) => prev.filter((item) => item._id !== id));
            toast.success("Item removed from wishlist.");
          })
          .catch(() => {
            toast.error("Failed to remove item. Please try again.");
          });
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-lg font-semibold">Your wishlist is empty.</h2>
        <p className="text-gray-500 mt-2">
          Browse blogs and add your favorites to the wishlist.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">My Wishlist</h1>
      <div className="overflow-x-autorounded-3xl">
        <table className="table-auto w-full border-collapse ">
          <thead className="">
            <tr>
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Blog Title</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Published Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.title}</td>
                <td className="border px-4 py-2">{item.author}</td>
                <td className="border px-4 py-2">
                  {new Date(item.date).toLocaleDateString("en-US")}
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link to={`/blog/${item.blogId}`}>
                    <button className="text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out" >
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishlistPage;
