import { Button, makeStyle, Stack } from "@mui/material";
import MainBody from "./components/MainBody.js";
import Navbar from "./components/Navbar.js";
import Sidebar from "./components/Sidebar.js";
import Faq from "./pages/Faq.js";
import Contact from "./pages/Contact.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Logout from "./pages/Logout.js";
import Register from "./Register.js";
import Login from "./pages/Login.js";
import ForgotPassword from "./pages/ForgotPassword.js";
import ResetPassword from "./pages/ResetPassword.js";
import VerifyToken from "./pages/VerifyToken.js";
import VerifyEmail from "./pages/VerifyEmail.js";
import ViewList from "./pages/ViewList.js";
import CreateNewLink from "./pages/CreateNewLink.js";
import Widgets from "./pages/Widgets.js";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import GetLongURL from "./pages/GetLongURL.js";
import DashboardOverview from "./pages/DashboardOverview.js";
import DailyLinkChart from "./pages/DailyLinkChart.js";
const App = () => {
  return (
    <div className="App">
      <Navbar />
      {/* <Stack direction="row" spacing={2} margin="10px">
        <Sidebar />
        <MainBody />
      </Stack> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:shortCode" element={<GetLongURL />} />
        <Route exact path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <Dashboard />
            // </PrivateRoute>
          }
        >
          <Route path="overview" element={<DashboardOverview />} />
          <Route path="createNewLink" element={<CreateNewLink />} />
          <Route path="viewList" element={<ViewList />} />
          <Route path="widgets" element={<Widgets />} />
          <Route path="dailyLinkChart" element={<DailyLinkChart />} />
        </Route>
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyToken" element={<VerifyToken />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/verifyEmail/:token" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
};

export default App;
