import { useState, useContext } from 'react';
import { AuthContext } from '../AuthProvider'; // Update the path as necessary

const AddBlogPage = () => {
    const { user } = useContext(AuthContext); // Get the current user from AuthContext

    const [blogData, setBlogData] = useState({
        title: '',
        image: '',
        category: '',
        shortDescription: '',
        longDescription: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Add user details to blog data
        const blogDataWithUser = {
            ...blogData,
            userEmail: user?.email || 'guest', // Default to 'guest' if no user is logged in
            userName: user?.displayName || 'Guest User', // Default to 'Guest User' if no user is logged in
        };

        // Submit the data
        fetch('https://blog-web-server-kappa.vercel.app/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(blogDataWithUser),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add blog');
                }
                alert('Blog added successfully!');
                setBlogData({
                    title: '',
                    image: '',
                    category: '',
                    shortDescription: '',
                    longDescription: '',
                }); // Reset form
            })
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
    };

    return (
        <div>
            <h1>Add a New Blog</h1>

            {error && <div className="error-message">{error}</div>}

            <form
                onSubmit={handleSubmit}
                className="bg-black text-white p-6 rounded-lg shadow-lg space-y-4"
            >
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={blogData.title}
                    onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                    type="url"
                    placeholder="Image URL"
                    value={blogData.image}
                    onChange={(e) => setBlogData({ ...blogData, image: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <select
                    value={blogData.category}
                    onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white"
                >
                    <option value="" className="text-gray-400">Select a category</option>
                    <option value="tech">Tech</option>
                    <option value="health">Health</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="business">Business</option>
                    <option value="travel">Travel</option>
                </select>
                <textarea
                    placeholder="Short Description"
                    value={blogData.shortDescription}
                    onChange={(e) => setBlogData({ ...blogData, shortDescription: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <textarea
                    placeholder="Long Description"
                    value={blogData.longDescription}
                    onChange={(e) => setBlogData({ ...blogData, longDescription: e.target.value })}
                    required
                    className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-lg text-white ${loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 hover:bg-gray-500'
                        }`}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

        </div>
    );
};

export default AddBlogPage;
