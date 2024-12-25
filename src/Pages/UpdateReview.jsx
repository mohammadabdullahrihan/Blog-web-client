import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthProvider";

const UpdateBlog = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: "",
    categories: "",
    authorEmail: user?.email || "",
    authorName: user?.displayName || "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://blog-web-server-kappa.vercel.app/blogs/${id}`);
        const data = await response.json();
        setBlog(data);
        setFormData({
          title: data.title || "",
          content: data.content || "",
          coverImage: data.coverImage || "",
          categories: data.categories || "",
        });
      } catch (error) {
        toast.error("Failed to load blog data.");
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-web-server-kappa.vercel.app/updateblogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update blog.");
      }

      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog.");
    }
  };

  if (!blog) return <div>Loading blog data...</div>;

  return (
    <div className="max-w-lg my-8 p-6 bg-gray-100 rounded container-3 md:ml-[100px]">
      <h1 className="text-2xl font-bold mb-4">Update Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="authorEmail">
            Your Email
          </label>
          <input
            type="email"
            id="authorEmail"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1" htmlFor="authorName">
            Your Name
          </label>
          <input
            type="text"
            id="authorName"
            className="w-full border rounded-2xl px-4 py-5 bg-gray-100"
            value={user?.displayName || ""}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Blog Title</label>
          <input
            className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px]"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Blog Content</label>
          <textarea
            className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px]"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Cover Image URL</label>
          <input
            className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px]"
            type="url"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Categories</label>
          <input
            className="bg-gray-100 mt-5 rounded-lg p-[35px] py-[20px]"
            type="text"
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            placeholder="e.g., Technology, Lifestyle"
            required
          />
        </div>

        <button type="submit" className="btn">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
