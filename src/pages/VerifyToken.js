import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { string } from "yup";
import { formik, useFormik } from "formik";
import { handleLogin } from "../auth/auth.js";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
import { handleresetpassword } from "../auth/auth.js";

function VerifyToken() {
  const navigate = useNavigate();
  useEffect(() => {
    HandleTokenFromQueryParams();
  }, []);

  const HandleTokenFromQueryParams = async () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    const token = query.get("token");

    const response = await fetch(
      `${process.env.REACT_APP_API}/auth/verifyToken?id=${id}&token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ id: id, token: token }),
      }
    );

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      navigate("/resetPassword");
    } else {
      alert("Invalid Token..Try resetting your password again");
      navigate("/forgotpassword");
    }
  };

  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <Paper elevation={3} className="resetpasswordPaper">
      <h1>Please wait..Verifying your token </h1>
    </Paper>
  );
}

export default VerifyToken;
