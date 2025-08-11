// import { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";

// const BlogModal = ({ isOpen, onClose }) => {
//   const [title, setTitle] = useState("");
//   const [shortDescription, setDescription] = useState("");
//   const [imageUrl, setImage] = useState("");

//   const handleBlog = async (e) => {
//     e.preventDefault();
//     console.log("Submitting Blog:", { title, shortDescription, imageUrl });

//     try {
//       const payload = JSON.stringify({ title, shortDescription, imageUrl });

//       const response = await axios.post("http://localhost:3000/AddBlog", payload, {
//         headers: {
//           "Content-Type": "application/json"
//         },
//         withCredentials: true
//       });

//       console.log("Response:", response.status, response.data);

//       if (response.status === 200) {
//         console.log("✅ Blog added successfully");
//         alert("Blog Added Successfully")
//         setTitle("");
//         setDescription("");
//         setImage("");
//         onClose();
//       } else {
//         console.warn("❌ Blog submission failed");
//       }
//     } catch (error) {
//       console.error("🚨 Error:", error.message);
//       if (error.response) {
//         console.error("Response Error:", error.response.data);
//       }
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity ${isOpen ? '' : 'hidden'}`}>
//       <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-lg mx-4">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
//           aria-label="Close"
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Add New Blog</h2>

//         <form onSubmit={handleBlog} className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter blog title"
//               required
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
//             <textarea
//               id="description"
//               value={shortDescription}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter a short description"
//               required
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
//             <input
//               id="image"
//               type="text"
//               value={imageUrl}
//               onChange={(e) => setImage(e.target.value)}
//               placeholder="Enter image URL"
//               required
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
//           >
//             ➕ Add Blog
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogModal;











// import { useState } from "react";
// import axios from "axios";
// import { X } from "lucide-react";

// const BlogModal = ({ isOpen, onClose }) => {
//   const [title, setTitle] = useState("");
//   const [shortDescription, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState(""); // for URL
//   const [imageFile, setImageFile] = useState(""); // for base64
//   const [preview, setPreview] = useState(""); // for UI

//   const jwt = localStorage.getItem("token");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImageFile(reader.result); // base64
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleBlog = async (e) => {
//     e.preventDefault();
//     const image = imageUrl || imageFile;

//     if (!image) {
//       alert("Please provide either an image URL or upload an image.");
//       return;
//     }

//     try {
//       const payload = JSON.stringify({
//         title,
//         shortDescription,
//         imageUrl: image,
//       });

//       const response = await axios.post("https://kwikstack-admin-backend.onrender.com/AddBlog", payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${jwt}`
//         },
//         withCredentials: true,
//       });

//       if (response.status === 200) {
//         alert("✅ Blog added successfully");
//         setTitle("");
//         setDescription("");
//         setImageUrl("");
//         setImageFile("");
//         setPreview("");
//         onClose();
//       }
//     } catch (error) {
//       console.error("🚨 Error:", error.message);
//       alert("Failed to add blog. Check console for details.");
//     }
//   };

//   return (
//     <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity ${isOpen ? '' : 'hidden'}`}>
//       <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-lg mx-4">
        
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
//         >
//           <X size={20} />
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📝 Add New Blog</h2>

//         <form onSubmit={handleBlog} className="space-y-4">
//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//               placeholder="Enter blog title"
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">Short Description</label>
//             <textarea
//               id="description"
//               value={shortDescription}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//               placeholder="Enter a short description"
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Image (Choose one)</label>

//             <input
//               type="text"
//               value={imageUrl}
//               onChange={(e) => {
//                 setImageUrl(e.target.value);
//                 setImageFile(""); // clear file if URL is used
//                 setPreview(e.target.value);
//               }}
//               placeholder="Enter image URL"
//               className="mt-1 w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
//             />

//             <input
//               type="file"
//               accept="image/*"
//               onChange={(e) => {
//                 setImageUrl(""); // clear URL if file is used
//                 handleFileChange(e);
//               }}
//               className="w-full text-sm"
//             />
//           </div>

//           {preview && (
//             <div className="mt-2">
//               <p className="text-sm text-gray-500">Image Preview:</p>
//               <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-md border" />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
//           >
//             ➕ Add Blog
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BlogModal;





import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

const BlogModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [shortDescription, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");      // For image URL
  const [imageFile, setImageFile] = useState("");    // For base64 string
  const [preview, setPreview] = useState("");        // For previewing image

  const [jwt, setJwt] = useState("");

  // Fetch token only once when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setJwt(token);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageFile(reader.result);  // base64 string
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleBlog = async (e) => {
    e.preventDefault();
    const image = imageUrl || imageFile;

    if (!title || !shortDescription || !image) {
      alert("❗ Please fill in all fields and provide an image.");
      return;
    }

    if (!jwt) {
      alert("🔒 Authentication token not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        title,
        shortDescription,
        imageUrl: image,
      };

      const response = await axios.post(
        "https://kwikstack-admin-backend.onrender.com/AddBlog",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          withCredentials: true, // Optional: only needed if cookies/sessions are used
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("✅ Blog added successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setImageFile("");
        setPreview("");
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("🚨 Error adding blog:", error);
      alert("❌ Failed to add blog. Check console for more info.");
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-lg mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Add New Blog
        </h2>

        <form onSubmit={handleBlog} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter blog title"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Short Description
            </label>
            <textarea
              id="description"
              value={shortDescription}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Enter a short description"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image (Choose one)
            </label>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setImageFile(""); // Clear uploaded image
                setPreview(e.target.value); // Show preview
              }}
              placeholder="Enter image URL"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 mb-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImageUrl(""); // Clear URL if file is chosen
                handleFileChange(e);
              }}
              className="w-full text-sm"
            />
          </div>

          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Image Preview:</p>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-md border"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-md transition"
          >
            ➕ Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogModal;
