import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import ClientSlot from './pages/ClientSlot.jsx';
import Blog from './pages/Blog.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Admin />,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/ClientSlot",
    element: <ClientSlot />,
  },
  {
    path: "/Blog",
    element: <Blog />,
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);