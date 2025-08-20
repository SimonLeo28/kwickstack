// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import logo from "../images/kwickstack-logo.svg";

// const App = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError(""); 

//     try {
//       // const response = await fetch("http://localhost:3000/AdminLogin", {
//       //   method: "POST",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //   },
//       //   credentials: "include", // Needed if your backend uses cookies
//       //   body: JSON.stringify({ email, password }),
//       // });
//       const response = await axios.post("https://kwikstack-admin-backend.onrender.com/AdminLogin",
//         {username,password},{withCredentials: true}
//       );
//       console.log("Sent")
//       const token = response.data.token; //redeploying res error
//       localStorage.setItem("token", token);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//       if (response.status === 200) {
//         // Login success
//         navigate("/Admin");
//       } else {
//         const data = await response.json();
//         setError(data.message || "Login failed. Try again.");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
//       {/* Background Blobs */}
//       <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-100 opacity-20 rounded-full transform scale-[2] -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
//       <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-100 opacity-20 rounded-full transform scale-[2] translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

//       {/* Login Card */}
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md z-10">
//         <img src={logo} alt="KwickStack Logo" className="w-[200px] h-[200px] mx-auto" />
//         {/* <h2 className="text-2xl font-semibold text-center mb-2">Login</h2>
//         <p className="text-center text-gray-500 mb-6">Hi, Welcome back 👋</p> */}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
//             <input
//               type="email"
//               placeholder="Enter Admin Email"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Admin Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           {/* <div className="text-right text-sm text-gray-500">
//             Forgot password?{" "}
//             <a href="#" className="text-orange-500 hover:underline">
//               Reset here
//             </a>
//           </div> */}

//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors font-semibold"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/kwickstack-logo.svg";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://kwikstack-admin-backend.onrender.com/AdminLogin",
        { username, password },
        { withCredentials: true }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (response.status === 200) {
        navigate("/Admin");
      } else {
        setError(response.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-100 opacity-20 rounded-full transform scale-[2] -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-blue-100 opacity-20 rounded-full transform scale-[2] translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md z-10">
        <img
          src={logo}
          alt="KwickStack Logo"
          className="w-[200px] h-[200px] mx-auto"
        />

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email ID
            </label>
            <input
              type="email"
              placeholder="Enter Admin Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-6 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
              loading
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
