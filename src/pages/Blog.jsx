import { Eye, Pencil, Trash } from "lucide-react";
import logo from '../../images/kwickstack-logo.svg';
import Navbar from './Navbar';

const blogs = [
  { id: 1, title: "Bootcamp", author: "kas,n,ssaa", image: "📊" },
  { id: 2, title: "boooootcamp bubble.io", author: "hello", image: "📄" },
  { id: 3, title: "Laptop Blog", author: "user123", image: "💻" },
  { id: 4, title: "hello", author: "helllodjkkcj", image: "📷" },
];

export default function Blog() {
  return (
    <>
    <div className='flex justify-center items-center flex-col'>
          <img className='p-3' src={logo} alt='KwickStack logo' />
          <hr className='w-[90%] border-black border-1' />
        </div>
    <div className="flex p-8">
      <Navbar />
      <div className="flex flex-col justify-start items-start mb-6">
        <div className="flex justify-around gap-[650px]">
        <h2 className="text-2xl pl-10 p-3 font-bold">Blog</h2>
        <button className="bg-yellow-500 ml-10 hover:bg-yellow-900 text-white p-3 rounded-md">+ Add Blog</button>
        </div>
        <div className="bg-white w-[900px] pl-10 shadow-md rounded-lg p-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex items-center border-b last:border-0 py-4"
          >
            <div className="text-2xl mr-4">{blog.image}</div>
            <div className="flex-1">
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-gray-500 text-sm">{blog.author}</p>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-600 hover:text-yellow-500">
                <Pencil size={20} />
              </button>
              <button className="text-gray-600 hover:text-blue-500">
                <Eye size={20} />
              </button>
              <button className="text-gray-600 hover:text-red-500">
                <Trash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

      
    </div>
    </>
  );
}

