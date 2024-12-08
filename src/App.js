import { Routes, Route } from 'react-router-dom';
import LoginView from './pages/Login';
import CalendarView from './pages/Calendar';
import ExamView from './pages/ExamForm';
import AboutUsView from './pages/AboutUs';
import DashboardView from './pages/Dashboard';

import { EventsProvider } from './components/EventsContext';
 
const App = () => {
   return (
      <EventsProvider>
         <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/programare" element={<ExamView />} />
            <Route path="/despre-noi" element={<AboutUsView />} />
            <Route path="/administrare" element={<DashboardView />} />
         </Routes>
      </EventsProvider>
   );
};
 
export default App;