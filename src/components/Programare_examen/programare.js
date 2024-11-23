import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./programare.css"

function ProgramareExamen() {
  const materii = [
    { id: 1, nume: "Matematică" },
    { id: 2, nume: "Fizică" },
    { id: 3, nume: "Informatică" },
    { id: 4, nume: "Chimie" },
  ];

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

  return (
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

      {/* Afișarea materiei selectate */}
      <div style={{ marginBottom: "20px" }}>
        <strong>Materia selectată:</strong>{" "}
        {materieSelectata || "Nicio materie selectată"}
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

      {/* Butoanele de acțiune */}
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => alert("Solicitarea a fost trimisă!")}
        >
          Solicită dată de examen
        </button>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            setMaterieSelectata("");
            setDataSelectata(null);
            setOraSelectata({ ora: 0, minut: 0 });
            setProfesor("");
          }}
        >
          Anulează solicitarea
        </button>
      </div>
    </div>
  );
}

export default ProgramareExamen;
