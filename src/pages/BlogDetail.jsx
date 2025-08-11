// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// export default function BlogDetail() {
//   const { id } = useParams(); // get blog id from route
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`https://kwikstack-admin-backend.onrender.com/blog/${id}`);
//         if (!res.ok) throw new Error("Blog not found");
//         const data = await res.json();
//         setBlog(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading blog...</p>;
//   if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <Link to="/" className="text-blue-500 hover:underline">← Back to Blogs</Link>
//       <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>
//       <p className="text-gray-500 text-sm mt-1">
//         {new Date(blog.createdAt).toLocaleDateString()}
//       </p>
//       {blog.image && (
//         <img
//           src={blog.imageUrl}
//           alt={blog.title}
//           className="w-full rounded-lg mt-4"
//         />
//       )}
//       <div className="mt-6 text-lg text-justify leading-relaxed">
//         {blog.shortDescription}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import NavBar from './components/navBar.jsx';
import { useParams, Link } from 'react-router-dom';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
// import Footer from "./components/Footer.jsx";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to validate base64
  const isBase64 = (str) => {
    return /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(str);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://kwikstack-admin-backend.onrender.com/blog/${id}`);
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!blog) {
    return <div className="text-center mt-10 text-red-500">Blog not found.</div>;
  }

  return (
    <div className='overflow-x-hidden'>
{/* //       <NavBar /> */}
       <div className='px-4 md:px-24 mt-10'>
         <Link to="/Admin">
           <button className='text-lg font-medium text-orange-500 hover:underline mb-10'>
             ← Back to Blog
          </button>
         </Link>

         <h1 className='text-xl md:text-3xl lg:text-6xl font-medium'>{blog.title}</h1>

         {blog.imageUrl && (
          <div className="mt-14 mb-10 flex justify-center">
            <img
              src={isBase64(blog.imageUrl) ? blog.imageUrl : blog.imageUrl}
              alt="Blog Cover"
              className="w-[70%] h-auto object-cover rounded-md"
            />
          </div>
        )}

         <Markdown
           remarkPlugins={[remarkGfm]}
           rehypePlugins={[rehypeHighlight]}
           className="prose prose-lg prose-gray max-w-none mb-36"
         >
           {blog.shortDescription}
         </Markdown>
      </div>
{/* //       <Footer /> */}
        </div>
  );
}

export default BlogDetail;
