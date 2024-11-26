import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Programare.css";
import Nav from "../components/Navbar";
import { useEvents } from "../components/EventsContext"; // Import the context

function ExamView() {

  const an_studiu = [
    {id: 1, nume: 'Anul 1'},
    {id: 2, nume: 'Anul 2'},
    {id: 3, nume: 'Anul 3'},
    {id: 4, nume: 'Anul 4'}
  ]

  const semestru = [
    {id: 1, nume: 'Semestrul 1'},
    {id: 2, nume: 'Semestrul 2'}
  ]

  const materii = [
    { id: 1, nume: "PCLP1 (Programarea calculatoarelor si limbaje de programare 1)" },
    { id: 2, nume: "GAC (Grafica Asistata de Calculator)" },
    { id: 3, nume: "AM (Analiza Matematica)" },
    { id: 4, nume: "ALGAD (Algebra Liniara, Geometrie Analitica si Diferentiala)" },
    { id: 5, nume: "PL (Proiectare Logica)" },
    { id: 6, nume: "Com (Comunicare)" },
    { id: 5, nume: "Engl1 (Engleza 1)" },
    { id: 5, nume: "EdFiz1 (Educatie Fizica 1)" },
    { id: 5, nume: "CMat (Complemente de Matematica)" }
  ];

  const { setEvents } = useEvents(); // Get the setter function for events
  const [materieSelectata, setMaterieSelectata] = useState("");
  const [dataSelectata, setDataSelectata] = useState(null);
  const [oraSelectata, setOraSelectata] = useState({ ora: 0, minut: 0 });
  const [profesor, setProfesor] = useState("");

  const handleMaterieChange = (event) => {
    setMaterieSelectata(event.target.value);
  };

  const handleOraChange = (field, value) => {
    setOraSelectata({ ...oraSelectata, [field]: parseInt(value) || 0 });
  };

  const addEvent = () => {
    if (!materieSelectata || !dataSelectata || !profesor) {
      alert("Toate câmpurile sunt obligatorii!");
      return;
    }

    const startDate = new Date(dataSelectata);
    startDate.setHours(oraSelectata.ora, oraSelectata.minut);
  
    const endDate = new Date(startDate);
    endDate.setHours(endDate.getHours() + 1); // Example: set a 1-hour duration
  
    const newEvent = {
      title: `${materieSelectata} (${profesor})`,
      start: startDate,
      end: endDate,
      allDay: false,
    };
  
    setEvents((prevEvents) => {
      const updatedEvents = [...prevEvents, newEvent];
      localStorage.setItem("events", JSON.stringify(updatedEvents)); // Save to local storage
      return updatedEvents;
    });
  
    alert("Examen adăugat!");
  };

  return (
    <div>
      <Nav />
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h2>Planificare Examen</h2>

        {/* Dropdown-ul pentru alegerea materiei */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="materii" style={{ display: "block", marginBottom: "5px" }}>
            Alege disciplina:
          </label>
          <select
            id="materii"
            value={materieSelectata}
            onChange={handleMaterieChange}
            style={{ padding: "8px", width: "100%" }}
          >
            <option value="" disabled>
              Selectează o materie
            </option>
            {materii.map((materie) => (
              <option key={materie.id} value={materie.nume}>
                {materie.nume}
              </option>
            ))}
          </select>
        </div>

        {/* Input pentru nume profesor */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="profesor" style={{ display: "block", marginBottom: "5px" }}>
            Titular disciplină:
          </label>
          <input
            type="text"
            id="profesor"
            value={profesor}
            onChange={(e) => setProfesor(e.target.value)}
            placeholder="nume prof adaugat automat"
            style={{
              padding: "8px",
              width: "100%",
              fontStyle: profesor ? "normal" : "italic",
              color: profesor ? "black" : "gray",
            }}
          />
        </div>

        {/* Alegerea datei */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="data" style={{ display: "block", marginBottom: "5px" }}>
            Selectează data de examen:
          </label>
          <DatePicker
            id="data"
            selected={dataSelectata}
            onChange={(date) => setDataSelectata(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Alege o dată"
            minDate={new Date()}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>

        {/* Alegerea orei */}
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="ora" style={{ display: "block", marginBottom: "5px" }}>
            Setează ora de start:
          </label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="number"
              min="0"
              max="23"
              placeholder="Ora"
              value={oraSelectata.ora}
              onChange={(e) => handleOraChange("ora", e.target.value)}
              style={{ padding: "8px", width: "60px" }}
            />
            <span>:</span>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="Minute"
              value={oraSelectata.minut}
              onChange={(e) => handleOraChange("minut", e.target.value)}
              style={{ padding: "8px", width: "60px" }}
            />
          </div>
        </div>

        {/* Buton pentru adăugarea evenimentului */}
        <div style={{ marginTop: "20px" }}>
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={addEvent}
          >
            Adaugă examen
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExamView;
