import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";
import MainBody from "../components/MainBody.js";
import Sidebar from "../components/Sidebar.js";
import "./dashboard.css";

function Dashboard() {
  return (
    // <div className="dashbpardwrapper" sx={{ height: "100%" }}>
    <Stack direction="row" spacing={2} margin="10px" height="87vh">
      <Sidebar />
      <Box
        flex={5}
        sx={{
          boxShadow: "5px, 5px, 10px, 1px, #000",
          border: "1px solid black",
          borderRadius: "15px",
        }}
        className="bodyContent"
      >
        <Outlet />
      </Box>
      {/* <MainBody /> */}
      {/* <>
          <Outlet flex={5} sx={{ backgroundColor: "orange" }}>
            <Box>MainBody</Box>
          </Outlet>
        </> */}
    </Stack>
    // </div>
  );
}

export default Dashboard;
