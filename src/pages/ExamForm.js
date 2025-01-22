import React, { useState, useEffect } from "react";
import { exams_data } from "../data/Exams";
import DatePicker from "react-datepicker";
import Nav from "../components/Navbar";

import "react-datepicker/dist/react-datepicker.css";
import "../styles/Programare.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ExamView() {
  const [name, setName] = useState("");
  const [examType, setExamType] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [scheduledTime, setScheduledTime] = useState(null);
  const [duration, setDuration] = useState(1);
  const [department, setDepartment] = useState("");
  const [room, setRoom] = useState("");
  const [proffesor, setProfessor] = useState("");
  const [professors_data, setProfessorsData] = useState([]);
  const [room_data, setRoomsData] = useState([]); // State for rooms data

  useEffect(() => {
    // Fetch professors from API
    const fetchProfessors = async () => {
      try {
        const response = await fetch("http://localhost:8000/professors/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfessorsData(data);
        } else {
          console.error("Failed to fetch professors data");
        }
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    // Fetch rooms from API
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://localhost:8000/rooms/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRoomsData(data); // Set fetched rooms data
        } else {
          console.error("Failed to fetch rooms data");
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchProfessors();
    fetchRooms(); // Fetch rooms on component mount
  }, []);

  const handleSubmit = async () => {
    if (!name || !examType || !scheduledDate || !duration || !department || !room || !proffesor || !scheduledTime) {
      toast.error("Toate câmpurile sunt obligatorii!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
      return;
    }
  
    const dateString = scheduledTime;
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    const requestData = {
      exam_name: name,
      exam_type: examType,
      scheduled_date: scheduledDate.toISOString().split('T')[0],
      scheduled_time: formattedTime,
      duration,
      department,
      room,
      proffesor,
      status: "Pending",
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
        toast.success("Cererea a fost trimisă cu succes!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // Reset form fields
        setName("");
        setExamType("");
        setScheduledDate(null);
        setScheduledTime(null);
        setDuration(1);
        setDepartment("");
        setRoom("");
        setProfessor("");
      } else {
        toast.error("Eroare la trimiterea cererii. Verifică datele introduse!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Eroare la trimiterea cererii. Te rugăm să încerci din nou.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div id="exam-planning-page">
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
            max="4"
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
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          >
            <option value="">Selectează sala</option>
            {
              room_data.map((_room) => (
                <option key={_room.id} value={_room.name}>
                  {_room.short_name}
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
                <option key={_professor.id} value={_professor.id}>
                  {`${_professor.first_name} ${_professor.last_name}`} {/* Full name */ }
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
      <ToastContainer />
</div>
  );
}

export default ExamView;
