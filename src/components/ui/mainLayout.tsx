import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../dashboard/layout";
import Users from "../../pages/users";
import NotFound from "../../pages/notFound";
import { sections } from "../../constants/constant";
import React from "react";
import UserDetails from "../../pages/usersDetail";
import Login from "../../pages/login";
import ProtectedRoute from "./protectedToute";

const MainLayout = () => {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Layout routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {sections.map((section, i) => (
            <React.Fragment key={section.title || i}>
              {section.items.map((item) => (
                <React.Fragment key={item.name}>
                  <Route path={item.routeUrl} element={<Users />} />
                  <Route
                    path={`${item.routeUrl}/:id`}
                    element={<UserDetails />}
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainLayout;
