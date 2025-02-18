import { Eye, SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { useState } from "react";
import logo from '../../images/kwickstack-logo.svg';
import BlogModal from "./BlogModal";
import Navbar from "./Navbar";

// Sample blog posts data
const blogPosts = [
  { id: 1, title: "Bootcamp", image: "../assets/1212.jpg", author: "John Doe" },
  { id: 2, title: "React Basics", image: " ", author: "Jane Doe" },
  { id: 3, title: "Tailwind Tips", image: "../assets/laptop.jpeg", author: "Alex" },
  { id: 4, title: "Bubble.io Guide", image: "../assets/Power.jpeg", author: "Chris" },
  { id: 5, title: "Bubble.io", image: " ", author: "bubblebubble"}
];
<<<<<<< HEAD

const Blog = () => {
  const [posts, setPosts] = useState(blogPosts); // State for blog posts

  // Function to remove a post by ID
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className='p-10 flex justify-start items-start'>
        <div className='flex flex-col p-5 gap-2 w-full'>

        {/* Blog Header */}
        <div className="flex flex-row justify-between items-center min-w-[10px] my-6 gap-4">
          <h2 className="text-2xl font-bold">Blog</h2>
        
          {/* Add Blog Button */}
          <button className="flex flex-row bg-[#fd9600] hover:bg-[#f0e9cd] text-black font-semibold gap-2 px-4 py-3 mt-10 rounded-lg shadow"
            onClick={handleAddBlog}><SquarePlus/>Add Blog
          </button>
        </div>
        <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Table container with horizontal scroll on small screens */}
        <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
          
            {/* Table body with blog post data */}
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-2 text-center">{post.id}</td>
                
                  {/* Display image (if available) and title */}
                  <td className="p-2 flex items-center gap-4">
                    {post.image && <img src={post.image} alt="Blog" className="w-20 h-20 rounded object-cover" />}
                    <span className="font-semibold text-sm md:text-base">{post.title}</span>
                  </td>
                
                  <td className="p-2 text-sm md:text-base">{post.author}</td>

                  {/* Action buttons: Edit, View, Delete */}
                  <td className="p-2 flex justify-center gap-2">
                    <button className="text-yellow-500 hover:text-blue-700">
                      <SquarePen size={18} />
                    </button>
                    <button className="text-black-500">
                      <Eye size={18} />
                    </button>
                    <button className="text-black-500" onClick={() => handleDelete(post.id)}>
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
=======

export default function BlogDashboard() {
  const [posts, setPosts] = useState(blogPosts); // State for blog posts

  // Function to remove a post by ID
  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBlog = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div id="Blog" className='flex justify-center items-center flex-col'>
            <img className='p-3' src={logo} alt='KwickStack logo' />
            <hr className='w-[90%] border-black border-1' />
          </div>
>>>>>>> 847c0c5b5baf9862d5285fb1d3486c6d13a8fcec


      <div className='p-10 flex justify-start items-start'>
        <Navbar />
        <div className='flex flex-col p-5 gap-2 w-full'>

        {/* Blog Header */}
        <div className="flex flex-row justify-between items-center min-w-[10px] my-6 gap-4">
          <h2 className="text-2xl font-bold">Blog</h2>
        
          {/* Add Blog Button */}
          <button className="flex flex-row bg-[#fd9600] hover:bg-[#f0e9cd] text-black font-semibold gap-2 px-4 py-3 mt-10 rounded-lg shadow"
            onClick={handleAddBlog}><SquarePlus/>Add Blog
          </button>
        </div>
        <BlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Table container with horizontal scroll on small screens */}
        <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
          <table className="w-full border-collapse min-w-[300px]">
          
            {/* Table body with blog post data */}
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="p-2 text-center">{post.id}</td>
                
                  {/* Display image (if available) and title */}
                  <td className="p-2 flex items-center gap-4">
                    {post.image && <img src={post.image} alt="Blog" className="w-20 h-20 rounded object-cover" />}
                    <span className="font-semibold text-sm md:text-base">{post.title}</span>
                  </td>
                
                  <td className="p-2 text-sm md:text-base">{post.author}</td>

                  {/* Action buttons: Edit, View, Delete */}
                  <td className="p-2 flex justify-center gap-2">
                    <button className="text-yellow-500 hover:text-blue-700">
                      <SquarePen size={18} />
                    </button>
                    <button className="text-black-500">
                      <Eye size={18} />
                    </button>
                    <button className="text-black-500" onClick={() => handleDelete(post.id)}>
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
