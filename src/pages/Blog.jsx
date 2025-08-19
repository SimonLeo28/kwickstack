import { Eye, SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogModal from "./BlogModal";
import { Link } from "react-router-dom";

export default function BlogDashboard() {
  const [posts, setPosts] = useState([]); // Loaded from backend
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://kwikstack-admin-backend.onrender.com/blog");
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Delete a blog post by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://kwikstack-admin-backend.onrender.com/blog/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='p-10 flex justify-start items-start'>
        <div className='flex flex-col p-5 gap-2 w-full'>
          {/* Blog Header */}
          <div className="flex flex-row  justify-between items-center min-w-[10px] my-6 gap-4">
            <h2 className="text-2xl font-bold">Blog</h2>
            <button
              className="flex flex-row bg-[#fd9600] hover:bg-[#f0e9cd] text-black font-semibold gap-2 px-4 py-3 mt-10 rounded-lg shadow"
              onClick={handleAddBlog}
            >
              <SquarePlus />Add Blog
            </button>
          </div>

          <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

          {/* Blog Table */}
          <div className="bg-white shadow-lg rounded-lg  overflow-x-auto">
            <table className="w-full border-collapse min-w-full">
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post._id || index} className="border-b">
                    <td className="p-0 text-center">{index + 1}</td>
                    <td className="p-0 flex items-center gap-4">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          alt="Blog"
                          className="w-20 h-20 rounded object-cover"
                        />
                      )}
                      <span className="font-semibold text-sm md:text-base">
                        {post.title}
                      </span>
                    </td>
                    {/* <td className="p-2 text-sm md:text-base">
                      {post.shortDescription}
                    </td> */}
                    <td className="p-2 flex justify-center gap-2">
                      {/* <button className="text-yellow-500 hover:text-blue-700">
                        <SquarePen size={18} />
                      </button> */}
                      <Link to={`/blog/${post._id}`}>
                        <button className="text-black-500 hover:text-orange">
                          <Eye size={18} />
                        </button>
                      </Link>
                      <button
                        className="text-black-500 hover:text-orange"
                        onClick={() => handleDelete(post._id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
