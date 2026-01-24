import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";

const DashboardLayout = () => {
  return (
    <div className="">
      <div className="nav"></div>
      <Sidebar />

      <div className="main-body">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
