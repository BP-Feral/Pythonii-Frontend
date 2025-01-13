import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LoginView from "./pages/Login";
import CalendarView from "./pages/Calendar";
import ExamView from "./pages/ExamForm";
import AboutUsView from "./pages/AboutUs";
import DashboardView from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Cereri from "./pages/Cereri";
import RequestsPage from "./pages/RequestsPage"


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginView />} />
        {/* Protected routes */}
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/programare" element={<ExamView />} />
        <Route path="/despre-noi" element={<AboutUsView />} />
        <Route path="/administrare" element={<DashboardView />} />
        <Route path="/cereri" element={<Cereri/>}/>
        <Route path="/RequestsPage" element={<RequestsPage/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default App;