import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Nav from "../components/Navbar";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/Programare.css";


function ExamView() {
  const [name, setName] = useState("");
  const [examType, setExamType] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [duration, setDuration] = useState(1);
  const [department, setDepartment] = useState("");
  const [room, setRoom] = useState("");
  const [professor, setProfessor] = useState("");

  const handleSubmit = async () => {
    if (!name || !examType || !scheduledDate || !duration || !department || !room || !professor) {
      alert("All fields are required!");
      return;
    }

    const examData = {
      name,
      exam_type: examType,
      scheduled_date: scheduledDate.toISOString(),
      duration,
      department,
      room,
      proffesor: professor,
    };

    try {
      const response = await fetch("http://localhost:8000/exams/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(examData),
      });

      if (response.ok) {
        alert("Exam added successfully!");
        setName("");
        setExamType("");
        setScheduledDate(null);
        setDuration(1);
        setDepartment("");
        setRoom("");
        setProfessor("");
      } else {
        alert("Error while sending exam. Please check input data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error);
    }
  };

  return (
    <div>
      <Nav />
      <h2>Exam Planner</h2>
      <div>
        <div>
          <label htmlFor="name">
            Exam Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Exam Type */}
        <div>
          <label htmlFor="examType">
            Exam Type:
          </label>
          <select
            id="examType"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
          >
            <option value="" disabled>
              Choose exam type
            </option>
            <option value="written">written</option>
            <option value="oral">oral</option>
            <option value="mixed">mixed</option>
          </select>
        </div>

        {/* Scheduled Date */}
        <div>
          <label htmlFor="scheduledDate">
            Scheduled Date:
          </label>
          <DatePicker
            id="scheduledDate"
            selected={scheduledDate}
            onChange={(date) => setScheduledDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Alege o dată"
            minDate={new Date()}
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration">
            Duration (hours):
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
        <div>
          <label htmlFor="department">
            Department:
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option value="" disabled>
              Choose Department
            </option>
            <option value="soft">Soft</option>
            <option value="soft-hard">Hard-Soft</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Room */}
        <div>
          <label htmlFor="room">
            Room:
          </label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>

        {/* Professor */}
        <div>
          <label htmlFor="professor">
            Professor:
          </label>
          <input
            type="text"
            id="professor"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button className="addExamenButton" onClick={handleSubmit}>
            Submit exam
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamView;
