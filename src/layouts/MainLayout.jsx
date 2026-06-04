import { Outlet } from "react-router-dom";

import { Box, Toolbar } from "@mui/material";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

function MainLayout() {

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (

    <Box sx={{ display: "flex" }}>

      <Header
        toggleSidebar={toggleSidebar}
      />

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >

        <Toolbar />

        <Outlet />

      </Box>

    </Box>
  );
}
export default MainLayout;