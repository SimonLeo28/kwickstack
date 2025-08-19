// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import NavBar from './components/navBar.jsx';
// import { useParams, Link } from 'react-router-dom';
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github.css";
// // import Footer from "./components/Footer.jsx";

// function BlogDetail() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Helper to validate base64
//   const isBase64 = (str) => {
//     return /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(str);
//   };

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(`https://kwikstack-admin-backend.onrender.com/blog/${id}`);
//         setBlog(res.data);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//         setBlog(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (!blog) {
//     return <div className="text-center mt-10 text-red-500">Blog not found.</div>;
//   }

//   return (
//     <div className='overflow-x-hidden'>
// {/* //       <NavBar /> */}
//        <div className='px-4 md:px-24 mt-10'>
//          <Link to="/Admin">
//            <button className='text-lg font-medium text-orange-500 hover:underline mb-10'>
//              ← Back to Blog
//           </button>
//          </Link>

//          <h1 className='text-xl md:text-3xl lg:text-6xl font-medium'>{blog.title}</h1>

//          {blog.imageUrl && (
//           <div className="mt-14 mb-10 flex justify-center">
//             <img
//               src={isBase64(blog.imageUrl) ? blog.imageUrl : blog.imageUrl}
//               alt="Blog Cover"
//               className="w-[70%] h-auto object-cover rounded-md"
//             />
//           </div>
//         )}

//          <Markdown
//            remarkPlugins={[remarkGfm]}
//            rehypePlugins={[rehypeHighlight]}
//            className="prose prose-lg prose-gray max-w-none mb-36"
//          >
//            {blog.shortDescription}
//          </Markdown>
//       </div>
// {/* //       <Footer /> */}
//         </div>
//   );
// }

// export default BlogDetail;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Validate base64 image
  const isBase64 = (str) => {
    return /^data:image\/(png|jpeg|jpg|gif|webp);base64,/.test(str);
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `https://kwikstack-admin-backend.onrender.com/blog/${id}`
        );
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
    return <div className="text-center mt-20 text-lg">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="text-center mt-20 text-red-500 text-lg">
        Blog not found.
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-gray-50 min-h-screen">
      {/* Container */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-10">
        {/* Back button */}
        <Link to="/Admin">
          <button className="text-lg font-medium text-orange-500 hover:underline mb-8">
            ← Back to Blog
          </button>
        </Link>

        {/* Blog Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
          {blog.title}
        </h1>

        {/* Blog Cover Image */}
        {blog.imageUrl && (
          <div className="mt-6 mb-10 flex justify-center">
            <img
              src={isBase64(blog.imageUrl) ? blog.imageUrl : blog.imageUrl}
              alt="Blog Cover"
              className="w-full md:w-[80%] lg:w-[70%] rounded-xl shadow-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg prose-gray max-w-none mb-20 leading-relaxed">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {blog.shortDescription}
          </Markdown>
        </article>
      </div>
    </div>
  );
}

export default BlogDetail;
