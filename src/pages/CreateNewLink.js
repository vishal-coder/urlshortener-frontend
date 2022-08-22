import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import * as yup from "yup";
import { string } from "yup";
import { formik, useFormik } from "formik";
import { createShortCode } from "../services/shortCodeServices.js";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../Context/UserContext.js";
function CreateNewLink() {
  const location = useLocation();

  const navigate = useNavigate();
  const { user, login } = useContext(UserContext);
  const [successFlag, setSuccessFlag] = useState(false);

  const userValidation = yup.object({
    longURL: string().url().required(),
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
    initialValues: { longURL: "" },
    validationSchema: userValidation,
    onReset: handleReset,
    onSubmit: async (values) => {
      const data = await createShortCode(values, user.name);

      if (data.success) {
        setSuccessFlag(true);
        setFieldError("longURL", data.shortURL);
      } else {
        setFieldError("longURL", data.message);
      }
    },
  });
  return (
    <Paper elevation={3} className="createNewLinkPaper">
      <form action="" className="createNewLinkForm" onSubmit={handleSubmit}>
        <h2>Enter your link</h2>
        {touched.longURL && errors.longURL ? (
          <div className={successFlag ? "success" : "error"}>
            {errors.longURL}
          </div>
        ) : (
          ""
        )}
        <TextField
          fullWidth
          id="longURL-id"
          name="longURL"
          label="longURL"
          variant="outlined"
          value={values.longURL}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className="loginbtn-grp">
          <Button variant="contained" type="submit" size="large">
            Create Short Link
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
