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

function ResetPassword() {
  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    if (!(id && token)) {
      navigate("/login");
    }
  }, []);
  const [flag, setFlag] = useState(false);
  const [urlParams, setURLParams] = useSearchParams();
  const id = urlParams.get("id");
  const token = urlParams.get("token");
  const navigate = useNavigate();
  const styles = { background: flag === true ? "#CAF9C4" : "" };
  const userValidation = yup.object({
    password: string().required().min(8),
    confirmPassword: string()
      .required()
      .min(8)
      .oneOf([yup.ref("password")], "Your passwords do not match."),
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
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      const data = await handleresetpassword(values, id, token);
      if (data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        localStorage.removeItem("user");
        setFlag(true);
      } else {
        setFieldError("password", data.message);
      }
    },
  });
  return (
    <Paper elevation={3} className="resetpasswordPaper" style={styles}>
      {!flag ? (
        <>
          <h1>Reset Your Password</h1>
          <h4>
            Strong passwords include numbers, letters and punctuation marks
          </h4>
          <form action="" className="resetPassForm" onSubmit={handleSubmit}>
            {touched.password && errors.password ? (
              <div className="error">{errors.password}</div>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              id="password-id"
              name="password"
              label="enter new password"
              variant="outlined"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.confirmPassword && errors.confirmPassword ? (
              <div className="error">{errors.confirmPassword}</div>
            ) : (
              ""
            )}
            <TextField
              fullWidth
              id="confirmPassword-id"
              name="confirmPassword"
              label="confirm new password"
              variant="outlined"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="loginbtn-grp">
              <Button variant="contained" type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2>password updated!</h2>
          <h4>your password has been changed successfully.</h4>
          <h4>
            use your new password to <Link to="/login">log in</Link>
          </h4>
        </>
      )}
    </Paper>
  );
}

export default ResetPassword;
