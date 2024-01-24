import React, { useContext } from "react";
import { Navbar } from "./Navbar";
import { AppContext, AppProvider } from "./AppProvider";
import { TabPanel } from "./TabPanel";

export const Layout = ({ children }) => {
  return (
    <AppProvider>
      <div>
        <Navbar />
        <div className="relative">
          {children}
          <TabPanel />
        </div>
      </div>
    </AppProvider>
  );
};
