import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../dashboard/layout";
import Users from "../../pages/users";
import NotFound from "../../pages/notFound";
import { sections } from "../../constants/constant";
import React from "react";

const MainLayout = () => {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/auth" replace />} />

      {/* Layout routes */}
      <Route element={<DashboardLayout />}>
        {sections.map((section, i) => (
          <React.Fragment key={section.title || i}>
            {section.items.map((item) => (
              <Route path={item.routeUrl} element={<Users />} key={item.name} />
            ))}
          </React.Fragment>
        ))}
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainLayout;
