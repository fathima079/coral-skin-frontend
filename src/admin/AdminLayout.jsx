import React from "react";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#f5efe8]">
      <Outlet />
    </div>
  );
}