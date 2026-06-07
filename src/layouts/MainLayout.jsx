import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { useState } from "react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header toggleSidebar={toggleSidebar} />

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          minWidth: 0,
          overflow: "hidden",
          transition: "margin-left 0.3s ease",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
