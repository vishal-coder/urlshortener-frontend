import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";

import { useNavigate, Link, useParams } from "react-router-dom";

function GetLongURL() {
  const { shortCode } = useParams();
  console.log("verification token", shortCode);
  const navigate = useNavigate();
  useEffect(() => {
    HandleGetLongURL(shortCode);
  }, []);

  const HandleGetLongURL = async (shortCode) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_API}/shortner/${shortCode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
      }
    );

    const data = await response.json();
    if (data.success) {
      window.location.replace(data.longURL);
    } else {
      alert("Invalid Token..Try  again");
      //   navigate("/");
    }
  };

  return (
    <>
      <h1>Please wait..getting your url </h1>
    </>
  );
}

export default GetLongURL;
