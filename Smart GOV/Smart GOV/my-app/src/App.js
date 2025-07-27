import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AadharDetails from "./pages/AadharDetails";
import PanDetails from "./pages/PanDetails";
import DrivingDetails from "./pages/DrivingDetails";
import VoterDetails from "./pages/VoterDetails";
import VehicleDetails from "./pages/VehicleDetails";
import PassportDetails from "./pages/PassportDetails";
import LandDetails from "./pages/LandDetails";
import TaxDetails from "./pages/TaxDetails";
import BusinessDetails from "./pages/BusinessDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation(); // Get current location

  // List of paths where Header should NOT appear
  const hideHeaderPaths = ["/user/login", "/user/signup"];

  return (
    <div>
      {/* Conditionally render Header */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/aadharDetails" element={<ProtectedRoute><AadharDetails /></ProtectedRoute>} />
        <Route path="/panDetails" element={<ProtectedRoute><PanDetails /></ProtectedRoute>} />
        <Route path="/dlDetails" element={<ProtectedRoute><DrivingDetails /></ProtectedRoute>} />
        <Route path="/voterDetails" element={<ProtectedRoute><VoterDetails /></ProtectedRoute>} />
        <Route path="/vehicleDetails" element={<ProtectedRoute><VehicleDetails /></ProtectedRoute>} />
        <Route path="/passportDetails" element={<ProtectedRoute><PassportDetails /></ProtectedRoute>} />
        <Route path="/landDetails" element={<ProtectedRoute><LandDetails /></ProtectedRoute>} />
        <Route path="/taxDetails" element={<ProtectedRoute><TaxDetails /></ProtectedRoute>} />
        <Route path="/businessDetails" element={<ProtectedRoute><BusinessDetails /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute><ErrorPage/></ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
