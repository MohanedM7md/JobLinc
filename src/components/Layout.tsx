import { Outlet } from "react-router-dom";
import Navbar from "./NavBar"; // Import your Navbar component

function Layout() {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
