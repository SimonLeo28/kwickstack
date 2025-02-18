import { useState } from "react";

const BlogModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">KwikStack New Blog</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" required className="w-full border p-2 rounded" />
          </div>
          
          <div>
            <label htmlFor="description" className="block font-medium">Short description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" required className="w-full border p-2 rounded" />
          </div>
          
          <div>
            <label htmlFor="image" className="block font-medium">Image</label>
            <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100">
              <span>{image ? image.name : "Click to upload an image"}</span>
              <input id="image" type="file" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          
          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold p-2 rounded" onClick={onClose}>Add Blog</button>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;