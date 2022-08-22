import "./App.css";
import Register from "./Register.js";

import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Faq from "./pages/Faq.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Logout from "./pages/Logout.js";
import Login from "./pages/Login.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import VerifyToken from "./pages/VerifyToken.js";
import VerifyEmail from "./pages/VerifyEmail.js";
import PrivateRoute from "./pages/PrivateRoute.js";

import { UserContext } from "./Context/UserContext.js";
function App() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const logOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          {/* <Button color="inherit" onClick={() => navigate("/contact")}>
            Contact
          </Button>
          <Button color="inherit" onClick={() => navigate("/about")}>
            About
          </Button>
          <Button color="inherit" onClick={() => navigate("/faq")}>
            Faq
          </Button> */}
          {user.auth ? (
            <Button color="inherit" onClick={logOut}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>

              <Button color="inherit" onClick={() => navigate("/login")}>
                login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="overview" element={<p>Overview</p>} />
          <Route path="AddUser" element={<p>AddUser</p>} />
          <Route path="ShowUserList" element={<p>ShowUserList</p>} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
