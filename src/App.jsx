import { Link } from "react-router-dom";

export default function App() {
  return (
    <>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div>
      <Link to={"/Admin"}>
      <h1>Click here for Admin Dashboard...</h1>
      </Link>
    </div>
    
    </>
  )
}