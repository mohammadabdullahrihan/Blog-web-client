import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bgnews from '/public/review.jpg'
import phone from '/public/phone.png'
import { motion } from "motion/react"

const Home = () => {
  const { user } = useContext(AuthContext);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    // Fetch recent blogs
    fetch("https://blog-web-server-kappa.vercel.app/blogs?limit=6")
      .then((res) => res.json())
      .then((data) => setRecentBlogs(data))
      .catch(() => toast.error("Failed to fetch recent blogs"));

    // Initialize AOS library
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleAddToWishlist = (blog) => {
    if (user) {
      const wishlistItem = {
        blogId: blog._id,
        title: blog.title,
        summary: blog.summary,
        userEmail: user.email,
      };

      fetch("https://blog-web-server-kappa.vercel.app/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures cookies (JWT token) are sent
        body: JSON.stringify(wishlistItem),
      })
        .then((res) => {
          if (res.ok) {
            toast.success(`${blog.title} added to your wishlist!`);
            return res.json();
          } else {
            return res.json().then((error) => {
              throw new Error(error.error || "Failed to add to wishlist");
            });
          }
        })
        .catch((err) => toast.error(err.message));
    } else {
      toast.error("Please log in to add to your wishlist.");
    }
  };

  const handleSubscribe = (event) => {
    event.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
  };

  return (
    <div className="space-y-12">
      {/* Banner */}
      <motion.section
        className="hero bg-black lg:marker:px-[200px] text-white text-center rounded-3xl py-[100px]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to Writing X
        </motion.h2>
      </motion.section>

      {/* Recent Blogs Section */}
      <div className="px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Recent Blogs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentBlogs.map((blog) => (
            <div
              key={blog._id}
              data-aos="fade-up"
              className="bg-black rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-4"
            >
              <img className="w-[400px] h-[300px] object-cover " src={blog?.image} alt="" />
              <h3 className="text-xl text-white font-semibold mb-2">{blog.title}</h3>
              <p className="text-white mb-4">{blog.shortDescription}</p>
              {
                user ? [
                  <>
                    <button
                      onClick={() => handleAddToWishlist(blog)}
                      className="text-black bg-white  rounded-full px-6 py-4 hover:text-white hover:bg-black hover:border-2 border-white transition-all duration-300 ease-in-out mr-5"
                    >
                      Add to Wishlist
                    </button>

                    <Link to={`/blog/${blog._id}`}>
                      <button className="text-black bg-white  rounded-full px-6 py-4 hover:text-white hover:bg-black hover:border-2 border-white transition-all duration-300 ease-in-out" >
                        Details
                      </button>
                    </Link>
                  </>
                ]
                  : []
              }
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}

      {/* <div className="lg:flex">
            <div>
          <img className="rounded-l-[50px]" src={bgnews} alt="" />

            </div>

          <div className="bg-black lg:px-[180px] lg:py-[30px] rounded-r-[50px]" >
          <div className="px-4 text-center bg-black">
          <h2 className="text-3xl font-bold mb-6 text-white">Subscribe to our newsletter <br /> to receive our daily reviews</h2>
          <p className="mb-5 text-white">Subscribe to our newsletter to receive our daily reviews</p>
          <form onSubmit={handleSubscribe} className=" items-center space-x-4 rounded-3xl">
            <input
              type="email"
              placeholder="Enter your email"
              className="border rounded-3xl px-[100px] py-7 w-full "
            />
            <button
              type="submit"
              className="text-white bg-black  rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
          </div>
          </div> */}
      <motion.div
        className="lg:flex"
        initial={{ x: -300, opacity: 0 }} // Start position (left offscreen)
        animate={{ x: 0, opacity: 1 }} // Final position (onscreen)
        transition={{ duration: 1, ease: "easeOut" }} // Transition configuration
      >
        <div>
          <img className="rounded-l-[50px]" src={bgnews} alt="Newsletter Background" />
        </div>

        <div className="bg-black lg:px-[180px] lg:py-[30px] rounded-r-[50px]">
          <div className="px-4 text-center bg-black">
            <h2 className="text-3xl font-bold mb-6 text-white">
              Subscribe to our newsletter <br /> to receive our daily reviews
            </h2>
            <p className="mb-5 text-white">
              Subscribe to our newsletter to receive our daily reviews
            </p>
            <form onSubmit={handleSubscribe} className="items-center space-x-4 rounded-3xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="border rounded-3xl px-[100px] py-7 w-full"
              />
              <button
                type="submit"
                className="text-white bg-black rounded-full px-6 py-4 hover:text-black hover:bg-white hover:border border-black transition-all duration-300 ease-in-out"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </motion.div>

      <div className="lg:flex">

        <div className="bg-black lg:px-[50px] lg:py-[30px] rounded-[50px]" >
          <div className="px-4 text-center bg-black">
            <h2 className="text-6xl font-bold mb-6 text-white">Subscribe to our newsletter <br /> to receive our daily reviews</h2>
            <p className="mb-5 text-white">Subscribe to our newsletter to receive our daily reviews</p>

          </div>
        </div>
        <div>
          <img className="rounded-r-[50px] " src={phone} alt="" />
        </div>

      </div>

      <div className="lg:flex">
        <div className="bg-black p-10 lg
            :rounded-l-[50px] rounded-t-[50px] ">

          <div className="flex flex-col bg-white rounded-3xl lg:p-[120px]">
            <div className="px-6 py-8 sm:p-10 sm:pb-6">
              <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                <div>
                  <h2
                    className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl"
                  >
                    Starter
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">Suitable to grow steadily.</p>
                </div>
                <div className="mt-6">
                  <p>
                    <span className="text-5xl font-light tracking-tight text-black">
                      $25
                    </span>
                    <span className="text-base font-medium text-gray-500"> /mo </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex px-6 pb-8 sm:px-8">
              <a
                aria-describedby="tier-company"
                className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                href="#"
              >
                Get started
              </a>
            </div>
          </div>


        </div>

        <div className="bg-black lg:px-[50px] lg:py-[30px] lg:rounded-r-[50px] rounded-b-[50px]" >
          <div className="px-4 text-center bg-black">
            <h2 className="text-6xl font-bold mb-6 text-white">Get Premium access</h2>
            <p className="mb-5 text-white">Buy Subscription to get premium access</p>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
