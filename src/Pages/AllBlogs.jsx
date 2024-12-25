import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider";
import { toast } from "react-toastify";

const AllBlogs = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "https://blog-web-server-kappa.vercel.app/blogs",
        {
          params: {
            category: selectedCategory,
            title: searchQuery,
          },
        }
      );
      setBlogs(response.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();

    // Extract unique categories from blogs
    const uniqueCategories = Array.from(
      new Set(blogs.map((blog) => blog.category))
    );
    setCategories(uniqueCategories);
  }, [selectedCategory, searchQuery]);
  // Handle adding a blog to the wishlist
  const handleAddToWishlist = (blog) => {
    if (user) {
      const wishlistItem = { userId: user.id, blogId: blog._id };

      fetch("https://blog-web-server-kappa.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (JWT token) are sent
        body: JSON.stringify(wishlistItem),
      })
        .then(() => {
          toast.success(`${blog.title} has been added to your wishlist!`);
        })
        .catch((err) => console.error("Error adding to wishlist:", err));
    } else {
      toast.error("Please log in to add items to your wishlist.");
    }
  };

  return (
    <div className="space-y-8 px-4">
      <h2 className="text-3xl font-bold text-center">All Blogs</h2>

      {/* Search and Filter Section */}
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
        className="flex flex-wrap gap-4 justify-center mb-6"
      >
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-lg px-4 py-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </form>

      {/* Blogs Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            data-aos="fade-up"
            className="bg-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4"
          >
            <img
              className="w-[400px] h-[300px] object-cover "
              src={blog?.image}
              alt=""
            />
            <h3 className="text-xl text-white font-semibold mb-2">
              {blog.title}
            </h3>
            <p className="text-white mb-4">{blog.shortDescription}</p>

            {user
              ? [
                  <>
                    <button
                      onClick={() => handleAddToWishlist(blog)}
                      className="text-black bg-white  rounded-full px-6 py-4 hover:text-white hover:bg-black hover:border-2 border-white transition-all duration-300 ease-in-out mr-5"
                    >
                      Add to Wishlist
                    </button>

                    <Link to={`/blog/${blog._id}`}>
                      <button className="text-black bg-white  rounded-full px-6 py-4 hover:text-white hover:bg-black hover:border-2 border-white transition-all duration-300 ease-in-out">
                        Details
                      </button>
                    </Link>
                  </>,
                ]
              : []}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
