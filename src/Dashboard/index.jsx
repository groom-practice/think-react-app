import { Link, Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <Link to={"/"}>HOME</Link> | <Link to={"/about"}>ABOUT</Link>
      <h1>Dashboard</h1>
      <p>Welcome to the Dashboard page !</p>
      <Outlet />
      <hr />
    </div>
  );
}
