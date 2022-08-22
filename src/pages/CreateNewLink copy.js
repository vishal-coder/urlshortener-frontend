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
function CreateNewLink() {
  const location = useLocation();

  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const userValidation = yup.object({
    url: string().url(),
  });

  const handleReset = () => {};
  const {
    formik,
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldError,
    onReset,
    resetForm,
  } = useFormik({
    initialValues: { url: "" },
    validationSchema: userValidation,
    onReset: handleReset,
    onSubmit: async (values) => {
      alert("on sbubit");
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
    <Paper elevation={3} className="createNewLinkPaper">
      <form action="" className="createNewLinkForm" onSubmit={handleSubmit}>
        <h2>Enter your link</h2>
        {touched.url && errors.url ? (
          <div className="error">{errors.url}</div>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          id="url-id"
          name="url"
          label="url"
          variant="outlined"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="loginbtn-grp">
          <Button variant="contained" type="submit" size="large">
            Login
          </Button>

          <Button type="reset" onClick={resetForm} variant="outlined">
            Reset
          </Button>
        </div>
      </form>
    </Paper>
  );
}

export default CreateNewLink;
