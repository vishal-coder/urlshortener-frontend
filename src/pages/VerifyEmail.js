import React, { useContext, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { string } from "yup";
import { formik, useFormik } from "formik";
import { handleLogin } from "../auth/auth.js";
import {
  useNavigate,
  Link,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
import { handleresetpassword } from "../auth/auth.js";

function VerifyEmail() {
  const [isValidToken, setIsValidToken] = useState(false);
  const { token } = useParams();
  console.log("verification token", token);
  const navigate = useNavigate();
  useEffect(() => {
    HandleTokenFromQueryParams(token);
  }, []);

  const HandleTokenFromQueryParams = async (token) => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/auth/verifyEmail/:${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ token: token }),
      }
    );

    const data = await response.json();
    if (data.success) {
      setIsValidToken(true);
    } else {
      alert("Invalid Token..Try  again");
      navigate("/register");
    }
  };

  return (
    <Paper elevation={3} className="resetpasswordPaper">
      {!isValidToken ? (
        <>
          <h1>Please wait..Verifying your email </h1>
        </>
      ) : (
        <div className="successResponse">
          <h1>
            <strong>Account confirmed!</strong>.{" "}
          </h1>
          <h3>
            <Link to="/login">Please Login</Link>{" "}
          </h3>
        </div>
      )}
    </Paper>
  );
}

export default VerifyEmail;
