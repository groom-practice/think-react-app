import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <nav>
        <Link to="/">Home</Link> | <Link to="/posts">Posts</Link>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
