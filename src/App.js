// App.js
import { Routes, Route } from 'react-router-dom';
import LoginView from './pages/Login';
import CalendarView from './pages/Calendar';
import ExamView from './pages/Exam';
import AboutUsView from './pages/AboutUs';
import { EventsProvider } from './components/EventsContext';
 
const App = () => {
   return (
      <EventsProvider>
         <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/exam" element={<ExamView />} />
            <Route path="/aboutus" element={<AboutUsView />} />
         </Routes>
      </EventsProvider>
   );
};
 
export default App;