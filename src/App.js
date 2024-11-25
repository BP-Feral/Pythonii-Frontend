// App.js
import { Routes, Route } from 'react-router-dom';
import LoginView from './pages/Login';
import CalendarView from './pages/Calendar';
import ProgramareView from './pages/Programare';
import AboutUsView from './pages/AboutUs';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<LoginView />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/exam" element={<ProgramareView />} />
            <Route path="/aboutus" element={<AboutUsView />} />
         </Routes>
      </>
   );
};
 
export default App;