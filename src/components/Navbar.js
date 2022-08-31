import {
  AppBar,
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LensBlurIcon from "@mui/icons-material/LensBlur";
import React, { useContext, useState } from "react";
import "./navbar.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "../Context/UserContext";
function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  return (
    <Box>
      <AppBar position="static" color="" className="appBar">
        <Toolbar className="toolbar">
          <Typography
            variant="h4"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Short.it
          </Typography>
          <LensBlurIcon sx={{ display: { xs: "block", sm: "none" } }} />
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {!user.auth ? (
              <>
                {" "}
                <Button
                  sx={{
                    display: { xs: "none", sm: "block", cursor: "pointer" },
                  }}
                  color="inherit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    display: { xs: "none", sm: "block", cursor: "pointer" },
                  }}
                >
                  login
                </Button>{" "}
              </>
            ) : (
              <>
                {" "}
                {/* <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    display: { xs: "none", sm: "block", cursor: "pointer" },
                  }}
                >
                  Logout
                </Button> */}
                <Typography
                  className="NavbarText"
                  variant="h6"
                  component="h6"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    fontSize: "14px",
                  }}
                >
                  {user ? user.name : ""}
                </Typography>
                <Avatar
                  alt="Cindy Baker"
                  src="https://cdn-icons.flaticon.com/png/512/1144/premium/1144709.png?token=exp=1660026715~hmac=50a10053e36e03b235b34a0ae1d7ae44"
                  onClick={() => {
                    setOpen(true);
                  }}
                  sx={{ cursor: "pointer" }}
                />{" "}
              </>
            )}
          </Box>
        </Toolbar>{" "}
        <Menu
          sx={{ marginTop: "2rem" }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          // anchorEl={true}
          open={open}
          onClose={() => setOpen(false)}
          placement="bottom-start"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/login");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </AppBar>
    </Box>
  );
}

export default Navbar;
