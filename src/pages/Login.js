import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { string } from "yup";
import { formik, useFormik } from "formik";
import { handleLogin } from "../auth/auth.js";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
function Login() {
  const location = useLocation();

  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const userValidation = yup.object({
    username: string().email().required(),
    password: string().required().min(6),
  });

  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldError,
  } = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      const data = await handleLogin(values);

      if (data.token) {
        let from = location.state?.from?.pathname || "/dashboard";
        localStorage.setItem("user", JSON.stringify(data.token));
        navigate(from, { replace: true });

        login(data.username, data.token); // change 'myUser' to actual username
      } else {
        setFieldError("username", data.message);
      }
    },
  });
  return (
    <Paper elevation={3} className="loginPaper">
      <form action="" className="loginForm" onSubmit={handleSubmit}>
        <h1>Enter your login details</h1>
        {touched.username && errors.username ? (
          <div className="error">{errors.username}</div>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          id="username-id"
          name="username"
          label="username"
          variant="outlined"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password ? (
          <div className="error">{errors.password}</div>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          id="password-id"
          name="password"
          type="password"
          label="password"
          variant="outlined"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className="loginbtn-grp">
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate("/forgotpassword")}
          >
            forgot Password
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default Login;
