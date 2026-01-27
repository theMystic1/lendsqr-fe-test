import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import NavBar from "./navBar";

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <header className="dashboard__nav">
        <NavBar />
      </header>

      <div className="dashboard__body">
        <aside className="dashboard__sidebar">
          <Sidebar />
        </aside>

        <main className="dashboard__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
