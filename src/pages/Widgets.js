import "./dashboardOverview.css";

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import LoadingSpinner from "./LoadingSpinner.js";

function Widgets({ type }) {
  const [widgetData, setWidgetData] = React.useState({});
  const [spinner, setSpinner] = React.useState(true);
  const { user } = useContext(UserContext);
  React.useEffect(() => {
    getWidgetData(type, user.name);
  }, []);

  const getWidgetData = async (type, username) => {
    const response = await fetch(
      `${process.env.REACT_APP_API}/shortner/${type}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username: username }),
      }
    );

    const data = await response.json();
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
