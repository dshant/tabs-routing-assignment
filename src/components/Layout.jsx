import React from "react";
import { Navbar } from "./Navbar";
import { AppProvider } from "./AppProvider";
import { TabPanel } from "./TabPanel";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <AppProvider>
      <div>
        <Navbar />
        <div className="relative">
          <Outlet />
          <TabPanel />
        </div>
      </div>
    </AppProvider>
  );
};
