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
    <div className="overflow-x-hidden bg-white min-h-screen w-full">
      {/* Container */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* Back button */}
        <Link to="/Admin">
          <button className="text-base font-medium text-orange-500 hover:underline mb-10">
            ← Back to Blog
          </button>
        </Link>

        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-snug text-gray-900 mb-6">
          {blog.title}
        </h1>

        {/* Author + Date */}
        <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm md:text-base mb-12">
          <span className="font-medium">{blog.author || "Kwikstack Team"}</span>
          <span>•</span>
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </span>
        </div>

        {/* Blog Cover Image */}
        {blog.imageUrl && (
          <div className="mb-12 flex justify-center">
            <img
              src={isBase64(blog.imageUrl) ? blog.imageUrl : blog.imageUrl}
              alt="Blog Cover"
              className="w-full max-w-4xl rounded-xl shadow-lg object-cover"
            />
          </div>
        )}

        {/* Blog Content */}
        <article className="prose prose-lg prose-gray max-w-none leading-relaxed text-justify space-y-6">
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
