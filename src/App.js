<<<<<<< Updated upstream
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
=======

import Nav from './components/nav';
import LoginForm from './components/LoginPage'; // Import the LoginForm component
import Dropdown from './components/Programare_examen/Selectare_materie';
function App() {
  return (
    <div>
      {/*<Nav />  Navbar */}
      {/*LoginForm /> {/* Login Form */}
      <Dropdown />
>>>>>>> Stashed changes
    </div>
    );
  }

  return CalendarView()
}


export default App;