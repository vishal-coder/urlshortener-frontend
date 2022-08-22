import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useStyle } from "react";
import "./sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Divider from "@mui/material/Divider";
import { theme } from "../theme.js";
import { withStyles } from "@mui/material/styles";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

function Sidebar(props) {
  return (
    <Box
      className="sideBar"
      flex={1}
      sx={{
        backgroundColor: "#f5f5f5",
        // display: { xs: "none", sm: "block" },
        height: "100%",
        borderRadius: "15px",
      }}
    >
      <div className="title">Dashboard</div>
      <hr />
      <ul className="sideBarList">
        <Link to="overview" style={{ textDecoration: "none" }}>
          <li>
            <HomeIcon className="icon" />
            <span className="icon">Overview</span>
          </li>
        </Link>
        <Link to="createNewLink" style={{ textDecoration: "none" }}>
          <li>
            <AddCircleIcon className="icon" />
            <span className="icon">Create Short Link</span>
          </li>{" "}
        </Link>
        <Link to="viewList" style={{ textDecoration: "none" }}>
          <li>
            <VisibilityIcon className="icon" />
            <span className="icon">View Existing Links</span>
          </li>
        </Link>
      </ul>
    </Box>
  );
}

export default Sidebar;
