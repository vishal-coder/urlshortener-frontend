import "./dashboardOverview.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import LoadingSpinner from "./LoadingSpinner.js";
import { useNavigate, useLocation } from "react-router-dom";

function Widgets({ type }) {
  const [widgetData, setWidgetData] = React.useState({});
  const [spinner, setSpinner] = React.useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    getWidgetData(type, user.name);
  }, []);

  const getWidgetData = async (type, username) => {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${process.env.REACT_APP_API}/shortner/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ username: username }),
      }
    );

    const data = await response.json();
    if (data.success) {
      console.log("success - data", data);
    } else {
      if (response.status == 401) {
        navigate("/login", { replace: true });
        // alert("access denied");
        return;
      }
      alert("Invalid Token..Try  again");
    }
    setWidgetData(data);
    setSpinner(false);
    console.log("data--", data);
    return data;
  };

  return (
    <div className="widget">
      {!spinner ? (
        <>
          {console.log("widgetData--insdie --", widgetData)}
          <div className="widgetTitle">{widgetData.title}</div>
          <div className="widgetBody">{widgetData.data}</div>
          <div className="widgetBodyLink">
            <Link to="/dashboard/viewList"> see all data</Link>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Widgets;
{
  /* <Link to="createNewLink" style={{ textDecoration: "none" }}>
  <li>
    <AddCircleIcon className="icon" />
    <span className="icon">Create Short Link</span>
  </li>{" "}
</Link>; */
}
