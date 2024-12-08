import { Routes, Route } from 'react-router-dom';
import LoginView from './pages/Login';
import CalendarView from './pages/Calendar';
import ExamView from './pages/ExamForm';
import AboutUsView from './pages/AboutUs';
import DashboardView from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import { EventsProvider } from './components/EventsContext';
import { Navigate } from 'react-router-dom';

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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </EventsProvider>
  );
};

export default App;