import React from "react";
import { UserContext } from "../Context/UserContext";
import LoadingSpinner from "./LoadingSpinner.js";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useLocation } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", hide: true },
  { field: "_id", headerName: "Created On", minWidth: 330 },

  {
    field: "count",
    headerName: "Count",
    type: "number",
    // flex: 1,
  },
];
function DailyLinkChart() {
  const [spinner, setSpinner] = React.useState(false);
  const [rowData, setRowData] = React.useState([]);
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    HandleViewList(user.name);
  }, []);

  const HandleViewList = async (userName) => {
    setSpinner(true);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API}/shortner/widget/getDataByDay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
        body: JSON.stringify({ username: userName }),
      }
    );

    const responseData = await response.json();
    console.log("response  in chart is", responseData.data);
    let chartData = responseData.data;
    chartData.forEach((o, i) => (o.id = i + 1));
    console.log("response  in chartData is", chartData);
    setSpinner(false);
    if (responseData.success) {
      setRowData(responseData.data);
      console.log("success - data", responseData);
    } else {
      if (response.status == 401) {
        navigate("/login", { replace: true });
        // alert("access denied");
        return;
      }
      alert("Invalid Token..Try  again");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        border: 0,
        width: "100%",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      {/* <div style={{ height: 400, width: "100%" }}> */}
      <h2>Day wise data</h2>
      <br />
      {!spinner ? (
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={rowData}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            sx={{
              // boxShadow: 2,
              border: 0,
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default DailyLinkChart;
