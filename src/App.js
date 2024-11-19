import React from 'react';
import LoginForm from './components/LoginPage'; // Check the path!
import Nav from './components/nav'; // Check the path!
import MyCalendar from './components/MyCalendar'; // Check the path!

function App() {

  function CalendarView() {
    return (
      <div>
        <Nav /> {/* Navbar */}
        <MyCalendar /> {/* MyCalendar */}
      </div>
    );
  }
    
  function Login() {
    return (
      <div>
      <Nav /> {/* Navbar */}
      <LoginForm /> {/* Login Form */}
    </div>
    );
  }

  return CalendarView()
}


export default App;