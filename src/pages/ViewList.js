import * as React from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { UserContext } from "../Context/UserContext";
import clsx from "clsx";
import LoadingSpinner from "./LoadingSpinner.js";

const columns = [
  { field: "id", headerName: "ID", hide: true, flex: 1 },
  { field: "longURL", headerName: "Long URL", minWidth: 330, flex: 4 },
  { field: "shortCode", headerName: "short URL", flex: 1 },
  {
    field: "count",
    headerName: "Count",
    type: "number",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "created On",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    type: "date",
    flex: 2,
  },
  {
    field: "lastAccess",
    headerName: "last Accessed On",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    type: "date",
    flex: 2,
  },
];

export default function ViewList() {
  const [spinner, setSpinner] = React.useState(false);
  const [rowData, setRowData] = React.useState([]);
  const { user } = React.useContext(UserContext);
  React.useEffect(() => {
    HandleViewList(user.name);
  }, []);

  const HandleViewList = async (userName) => {
    setSpinner(true);
    console.log("HandleViewList", userName);
    const response = await fetch(
      `${process.env.REACT_APP_API}/shortner/getAllURLS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username: userName }),
      }
    );

    const respnseData = await response.json();
    setSpinner(false);
    console.log("HandleViewList - data", respnseData);
    if (respnseData.success) {
      setRowData(respnseData.data);
      console.log("success - data", respnseData);
    } else {
      alert("Invalid Token..Try  again");
    }
  };
  return (
    <div style={{ display: "flex", height: "100%", border: 0 }}>
      {/* <div style={{ height: 400, width: "100%" }}> */}
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
