import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { string } from "yup";
import { formik, useFormik } from "formik";
import { handleLogin } from "../auth/auth.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
import { handleforgotpassword } from "../auth/auth.js";
import SendIcon from "@mui/icons-material/Send";
function ForgotPassword() {
  const [isdisabled, setIsdisabled] = useState(false);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const styles = { background: flag === true ? "#CAF9C4" : "" };
  const userValidation = yup.object({
    email: string().email().required(),
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
    initialValues: { email: "" },
    validationSchema: userValidation,
    onSubmit: async (values) => {
      setIsdisabled(true);
      const data = await handleforgotpassword(values);

      if (data.success) {
        setFlag(true);
      } else {
        setIsdisabled(false);
        setFieldError("email", data.message);
      }
    },
  });
  return (
    <Paper elevation={3} className="loginPaper" style={styles}>
      {!flag ? (
        <>
          <h1>Forgot Password ?</h1>
          <form action="" className="loginForm" onSubmit={handleSubmit}>
            {touched.email && errors.email ? (
              <div className="error">{errors.email}</div>
            ) : (
              ""
            )}
            <TextField
              id="email-id"
              name="email"
              label="enter email"
              variant="outlined"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
            />
            <h5>We'll send a link to reset your password.</h5>

            <div className="loginbtn-grp">
              <Button
                variant="contained"
                type="submit"
                disabled={isdisabled}
                endIcon={<SendIcon />}
              >
                Send mail
              </Button>
            </div>
          </form>
        </>
      ) : (
        <div className="forgotmailSuccess">
          <h2>Account Recovery email sent to your email </h2>
          <h4>Check your email inbox/updates to reset the password</h4>
        </div>
      )}
    </Paper>
  );
}

export default ForgotPassword;
