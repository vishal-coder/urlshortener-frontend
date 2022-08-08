import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { formik, useFormik } from "formik";
import * as yup from "yup";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
// import dotenv from "dotenv";
import { UserContext } from "./Context/UserContext.js";
import { submitRegistration } from "./auth/auth.js";
function Register() {
  const navigate = useNavigate();
  const [isregistered, setIsregistered] = useState(false);
  const { login } = useContext(UserContext);
  const userValidation = yup.object({
    firstName: string().required().min(4),
    lastName: string().required().min(4),
    username: string().email().required().min(6),
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
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      console.log(values);
      const data = await submitRegistration(values);
      console.log(data);
      console.log(data.success);
      if (data.success) {
        console.log("in if");
        // localStorage.setItem("user", JSON.stringify(data.token));
        // navigate("/dashboard");
        // login(data.username, data.token);
        setIsregistered(true);
      } else {
        console.log("in else");
        setFieldError("firstName", data.message);
      }
    },
  });

  return (
    <Paper elevation={3} className="regPaper">
      {!isregistered ? (
        <>
          <form className="regform" onSubmit={handleSubmit}>
            <h1>Sign up for free</h1>
            {touched.firstName && errors.firstName ? (
              <div className="error">{errors.firstName}</div>
            ) : (
              ""
            )}
            <TextField
              value={values.firstName}
              id="firstName"
              label="First Name"
              name="firstName"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.lastName && errors.lastName ? (
              <div className="error">{errors.lastName}</div>
            ) : (
              ""
            )}
            <TextField
              value={values.lastName}
              id="lastName"
              label="Last Name"
              name="lastName"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.username && errors.username ? (
              <div className="error">{errors.username}</div>
            ) : (
              ""
            )}
            <TextField
              value={values.username}
              id="Email-id"
              label="username"
              name="username"
              type="email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.password && errors.password ? (
              <div className="error">{errors.password}</div>
            ) : (
              ""
            )}
            <TextField
              value={values.password}
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Button type="submit" variant="contained" size="large">
              Register
            </Button>
          </form>
        </>
      ) : (
        <div className="successResponse">
          <h2>User Registered Successfully</h2>
          <h3></h3>
          <h4>Follow the link sent to your email to activate your account</h4>
        </div>
      )}
    </Paper>
  );
}

export default Register;
