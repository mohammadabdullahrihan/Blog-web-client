import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthProvider";

const BlogDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch blog details
    axios
      .get(`https://blog-web-server-kappa.vercel.app/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      });

    // Fetch comments for the blog
    axios
      .get(`https://blog-web-server-kappa.vercel.app/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      });
  }, [id]);

  // Handle adding a comment
  const handleAddComment = () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const commentData = {
      blogId: id,
      userName: user?.displayName || "Anonymous", // Fallback to "Anonymous"
      userProfilePic: user?.photoURL || "https://via.placeholder.com/50", // Fallback image
      commentText: newComment,
    };

    axios
      .post("https://blog-web-server-kappa.vercel.app/comments", commentData)
      .then((response) => {
        setComments((prev) => [...prev, commentData]);
        setNewComment("");
        alert("Comment added successfully.");
      });
  };

  // Navigate to the update blog page
  const handleUpdateBlog = () => {
    navigate(`/updateblog/${id}`);
  };

  if (!blog)
    return (
      <div className="text-center text-white">
        No blog found for the given ID.
      </div>
    );

  return (
    <div className="bg-black text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-5">{blog.title}</h1>

      <div className="blog-content lg:flex">
        <div>
          <img
            src={blog.image || "https://via.placeholder.com/300"}
            alt={blog.title}
            className="rounded-lg border border-white"
          />
        </div>
        <div className="blog-details ml-8 space-y-4">
          <p className="text-lg font-medium text-gray-300">
            {blog.description}
          </p>
          <p className="text-sm text-gray-500">Category: {blog.category}</p>
          <p className="text-sm text-gray-500">Author: {blog.authorName}</p>
        </div>
      </div>

      {blog?.userEmail === user?.email ? (
        <div className="comments-section space-y-4">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <p className="text-sm text-red-500">
            Cannot comment on your own blog.
          </p>
        </div>
      ) : (
        <div className="comments-section space-y-4">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <div className="add-comment space-y-2">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full border border-gray-600 rounded-lg p-4 bg-gray-800 text-white"
            ></textarea>
            <button
              onClick={handleAddComment}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500"
            >
              Add Comment
            </button>
          </div>
        </div>
      )}

      <div className="comments-list space-y-4">
        {comments?.map((comment) => (
          <div
            key={comment?._id}
            className="comment-item flex items-start space-x-4 border border-gray-700 p-4 rounded-lg bg-gray-800"
          >
            <img
              src={comment?.userProfilePic || "https://via.placeholder.com/50"}
              alt={comment?.userName}
              className="w-10 h-10 rounded-full border border-gray-600"
            />
            <div>
              <p className="text-sm font-semibold">{comment.userName}</p>
              <p className="text-sm text-gray-400">{comment.commentText}</p>
            </div>
          </div>
        ))}
      </div>

      {blog?.userEmail === user?.email && (
        <div className="update-blog-button text-center">
          <button
            onClick={handleUpdateBlog}
            className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-500"
          >
            Update Blog
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
