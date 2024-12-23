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
        <Route path="/calendar" element={<PrivateRoute element={<CalendarView />} />} />
        <Route path="/programare" element={<PrivateRoute element={<ExamView />} />} />
        <Route path="/despre-noi" element={<PrivateRoute element={<AboutUsView />} />} />
        <Route path="/administrare" element={<PrivateRoute element={<DashboardView />} />} />
        <Route path="/cereri" element={<PrivateRoute element={<Cereri/>}/>}/>
        <Route path="/RequestsPage" element={<PrivateRoute element={<RequestsPage/>}/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
};

export default App;