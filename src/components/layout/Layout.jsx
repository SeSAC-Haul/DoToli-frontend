import { Outlet } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = () => (
    <div className="flex">
      <Sidebar/>
      <div className="ml-64 flex-1">
        <Topbar/>
        <main className="mt-16 p-8">
          <Outlet/>
        </main>
      </div>
    </div>
);

export default Layout;