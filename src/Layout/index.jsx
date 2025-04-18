import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Layout Header</h1>
      <hr />
      <Outlet />
    </main>
  );
}
