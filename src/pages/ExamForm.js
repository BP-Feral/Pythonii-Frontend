import React, { useState } from "react";
import { professors_data } from "../data/Professors";
import { rooms_data } from "../data/Rooms";
import { exams_data } from "../data/Exams";

import DatePicker from "react-datepicker";
import Nav from "../components/Navbar";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/Programare.css";


function ExamView() {
  const [name, setName] = useState("");
  const [examType, setExamType] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [duration, setDuration] = useState(1);
  const [department, setDepartment] = useState("");
  const [room, setRoom] = useState("");
  const [proffesor, setProfessor] = useState("");

  const handleSubmit = async () => {
    if (!name || !examType || !scheduledDate || !duration || !department || !room || !proffesor || !scheduledTime) {
      alert("All fields are required!");
      return;
    }
  
    const dateString = scheduledTime;
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    // Crearea unei cereri pentru examen
    const requestData = {
      exam_name: name,
      exam_type: examType,
      scheduled_date: scheduledDate.toISOString().split('T')[0],
      scheduled_time: formattedTime,
      duration,
      department,
      room,
      proffesor,
      status: "Pending",  // Inițial cererea este în stare "Pending"
    };
  
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/requests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access_token}`,
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        alert("Cererea a fost trimisă cu succes!");
        // Resetați câmpurile formularului
        setName("");
        setExamType("");
        setScheduledDate(null);
        setScheduledTime(null);
        setDuration(1);
        setDepartment("");
        setRoom("");
        setProfessor("");
      } else {
        alert("Error while sending the request. Please check input data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Eroare la trimiterea cererii. Te rugăm să încerci din nou.");
    }
  };
  

  return (
    <div>
      <Nav />
      <h2>Planificare Examen</h2>
      <div>

        {/* Exam Name */}
        <div className="option-field">
          <label htmlFor="name">Numele Examenului:</label>
          <select
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Selecteaza Examenul</option>
            {
              exams_data.map((_exams) => (
                <option key={_exams.id} value={_exams.name}>
                  {_exams.name}
                </option>
              ))
            }
          </select>
        </div>

        {/* Exam Type */}
        <div className="option-field">
          <label htmlFor="examType">
            Tipul Examenului:
          </label>
          <select
            id="examType"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <option value="" disabled>
              selecteaza
            </option>
            <option value="Written">scris</option>
            <option value="Oral">oral</option>
            <option value="Mixed">mix</option>
          </select>
        </div>

        {/* Scheduled Date */}
        <div className="option-field">
          <label htmlFor="scheduledDate">
            Data Programarii:
          </label>
          <DatePicker
            id="scheduledDate"
            selected={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            dateFormat="YYYY-MM-DD"
            placeholderText="selecteaza data"
            minDate={new Date()}
          />
        </div>

        {/* Scheduled time */}
        <div className="option-field">
          <label htmlFor="scheduledTime">
            Ora Programării:
          </label>
          <DatePicker
            id="scheduledTime"
            selected={scheduledTime}
            onChange={(hour) => setScheduledTime(hour)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Ora"
            dateFormat="HH:mm"
            placeholderText="Selectează ora"
          />
        </div>

        {/* Duration */}
        <div className="option-field">
          <label htmlFor="duration">
            Durata (in ore):
          </label>
          <input
            type="number"
            id="duration"
            min="1"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
          />
        </div>

        {/* Department */}
        <div className="option-field">
          <label htmlFor="department">
            departament:
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled>
              alege departament
            </option>
            <option value="soft">soft</option>
            <option value="soft-hard">hard + soft</option>
            <option value="hard">hard</option>
          </select>
        </div>

        {/* Room */}
        <div className="option-field">
          <label htmlFor="room">Sala:</label>
          <select
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">Selecteaza sala</option>
            {
              rooms_data.map((_room) => (
                <option key={_room.id} value={_room.name}>
                  {_room.name}
                </option>
              ))
            }
          </select>
        </div>

        {/* Professor */}
        <div className="option-field">
          <label htmlFor="proffesor">Profesor:</label>
          <select
            id="proffesor"
            value={proffesor}
            onChange={(e) => setProfessor(e.target.value)}
          >
            <option value="">Selecteaza un profesor</option>
            {
              professors_data.map((_professor) => (
                <option key={_professor.id} value={_professor.name}>
                  {_professor.name}
                </option>
              ))
            }
          </select>
        </div>

        {/* Submit Button */}
        <div className="option-button">
          <button className="addExamenButton" onClick={handleSubmit}>
            Trimite Cerere
          </button>
        </div>

      </div>
    </div>
  );
}

export default ExamView;