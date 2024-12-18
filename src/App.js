import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import LoginView from "./pages/Login";
import CalendarView from "./pages/Calendar";
import ExamView from "./pages/ExamForm";
import AboutUsView from "./pages/AboutUs";
import DashboardView from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Cereri from "./pages/Cereri";


const App = () => {
  return (
    <EventsProvider>
      <Routes>
        <Route path="/" element={<LoginView />} />
        {/* Protected routes */}
        <Route path="/calendar" element={<PrivateRoute element={<CalendarView />} />} />
        <Route path="/programare" element={<PrivateRoute element={<ExamView />} />} />
        <Route path="/despre-noi" element={<PrivateRoute element={<AboutUsView />} />} />
        <Route path="/administrare" element={<PrivateRoute element={<DashboardView />} />} />
        <Route path="/cereri" element={<PrivateRoute element={<Cereri/>}/>}/>
        <Route path="/CereriProfesorSecretariat" element={<PrivateRoute element={<CereriProfesorSecretariat/>}/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EventsProvider>
  );
};

export default App;
