import React, { useState, useEffect } from "react";

const ColoanaCereri = ({ title }) => {
  const [cereri, setCereri] = useState([]);  // Inițializare ca un array gol

  // Funcție pentru a obține cererile din backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/requests/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Folosește token-ul de acces
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Filtrăm cererile pentru a păstra doar cele care nu au statusul "ApprovedBySecretary" și "Rejected"
          const filteredCereri = data.filter(
            cerere => cerere.status !== "ApprovedBySecretary" && cerere.status !== "Rejected"
          );

          setCereri(filteredCereri);  // Salvează cererile filtrate în state
        } else {
          alert("Eroare la încărcarea cererilor.");
        }
      } catch (error) {
        console.error("Eroare de rețea:", error);
        alert("Eroare de rețea!");
      }
    };

    fetchRequests();
  }, []);  // Acesta este un efect care se va rula doar o singură dată la montarea componentei

  // Funcția pentru a respinge cererea
  const handleReject = async (requestId, role) => {
    const response = await fetch(`http://localhost:8000/requests/approveSecretary/${requestId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ action: "reject" }), // Trimitere acțiune "reject"
    });

    if (response.ok) {
      alert("Cererea a fost respinsă!");
      setCereri(cereri.filter((cerere) => cerere.id !== requestId)); // Elimină cererea respinsă din UI
    } else {
      alert("Eroare la respingerea cererii.");
    }
  };

  // Funcția pentru a aproba profesorul
  const handleApproveProfessor = async (requestId) => {
    const response = await fetch(`http://localhost:8000/requests/approveProfessor/${requestId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ action: "approve" }),
    });
    if (response.ok) {
      alert("Cererea a fost aprobată de profesor!");
    } else {
      alert("Eroare la aprobarea cererii de către profesor.");
    }
  };

  // Funcția pentru a aproba secretariatul
  const handleApproveSecretary = async (requestId, examData) => {
    const response = await fetch(`http://localhost:8000/requests/approveSecretary/${requestId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ exam: examData, action : "approve" }), // Trimite datele examenului
    });

    if (response.ok) {
      alert("Cererea a fost aprobată de secretariat și examenul a fost salvat!");
    } else {
      const errorData = await response.json();
      alert(`Eroare: ${errorData.error}`);
    }
  };

  return (
    <div className="columna-cereri">
      <h3>{title}</h3>
      {cereri.length > 0 ? (
        cereri.map((cerere) => (
          <div key={cerere.id} className="cerere">
            {/* Afișează informațiile examenului dacă există */}
            <p>Examen: {cerere.exam_details ? cerere.exam_details.name : "Niciun examen asociat"}</p>
            <p>Sala: {cerere.exam_details ? cerere.exam_details.room : "Niciun sala asociata"}</p>
            <p>
              {cerere.exam_details ? (
                <>
                  <span>Ora: {cerere.exam_details.scheduled_time}</span><br />
                  <span>Data: {cerere.exam_details.scheduled_date}</span>
                </>
              ) : (
                <span>Data și ora nu sunt încă disponibile</span>
              )}
          </p>
            {/* Afișează profesorul */}
            <p>Profesor: {cerere.destinatar ? cerere.destinatar : "Niciun profesor asociat"}</p>
            {/* Butoane de aprobare */}
            {cerere.status === "Pending" && (
              <div>
                <button onClick={() => handleApproveProfessor(cerere.id)}>Aprobă Cerere</button>
                <button onClick={() => handleReject(cerere.id, "professor")}>Respinge Cerere</button>
              </div>
            )}

            {cerere.status === "ApprovedByProfessor" && (
              <div>
                <button onClick={() => handleApproveSecretary(cerere.id, cerere.exam_details)}>Aprobă Cerere</button>
                <button onClick={() => handleReject(cerere.id, "secretary")}>Respinge Cerere</button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Nu există cereri disponibile.</p> // Mesaj de eroare dacă nu există cereri
      )}
    </div>
  );
};

export default ColoanaCereri;
