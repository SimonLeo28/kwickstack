import { Eye, SquarePlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogModal from "./BlogModal";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
  const [posts, setPosts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://kwikstack-admin-backend.onrender.com/blog");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Delete blog with confirmation
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) return;

  try {
    // This sends a DELETE request to your backend
    await axios.delete(`https://kwikstack-admin-backend.onrender.com/blog/${id}`);

    // If backend responds success, update local state
    setPosts((prev) => prev.filter((post) => post._id !== id));
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

  return (
    <div className="p-4 md:p-10 flex justify-start items-start">
      <div className="flex flex-col gap-4 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-xl md:text-2xl font-bold">Blog</h2>
          <button
            className="flex flex-row items-center bg-[#fd9600] hover:bg-[#f0e9cd] text-black font-semibold gap-2 px-4 py-2 rounded-lg shadow"
            onClick={() => setIsModalOpen(true)}
          >
            <SquarePlus size={18} /> Add Blog
          </button>
        </div>

        {/* Blog Modal */}
        <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Blog List */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          {loading ? (
            <p className="text-center py-6">Loading blogs...</p>
          ) : posts.length === 0 ? (
            <p className="text-center py-6">No blogs available.</p>
          ) : (
            <table className="w-full border-collapse min-w-[300px]">
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post._id || index} className="border-b hover:bg-gray-50">
                    {/* Index */}
                    <td className="p-3 text-center text-sm md:text-base">{index + 1}</td>

                    {/* Image + Title */}
                    <td className="p-3 flex items-center gap-3">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="Blog"
                          className="w-16 h-16 md:w-20 md:h-20 rounded object-cover"
                        />
                      )}
                      <span className="font-semibold text-sm md:text-base line-clamp-2">
                        {post.title}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3 flex justify-center gap-3">
                      <Link to={`/blog/${post._id}`}>
                        <button className="text-gray-600 hover:text-[#fd9600]">
                          <Eye size={18} />
                        </button>
                      </Link>
                      <button
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => handleDelete(post._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
