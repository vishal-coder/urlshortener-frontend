import React from "react";
import DailyLinkChart from "./DailyLinkChart";
import "./dashboardOverview.css";
import Widgets from "./Widgets";

function DashboardOverview() {
  return (
    <div>
      <div className="dashboardOverview">
        <h1>Dashboard Overview</h1>
        <div className="widgetwrapper">
          <Widgets flex={1} key="1" type="/widget/totalLinks" />
          <Widgets key="2" type="/widget/totaClicks" />
          <Widgets key="3" type="/widget/mostPopular" />
        </div>
        <hr />
        <div className="chartWrapper">
          {/* <div> */}
          <DailyLinkChart />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
