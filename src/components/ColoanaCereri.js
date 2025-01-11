import React from "react";

const ColoanaCereri = ({ title, cereri }) => {
    const handleApproveProfessor = async (requestId) => {
        const response = await fetch(`http://localhost:8000/requests/approveProfessor/${requestId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        if (response.ok) {
          alert("Cererea a fost aprobată de profesor!");
        } else {
          alert("Eroare la aprobarea cererii de către profesor.");
        }
    };

    const handleApproveSecretary = async (requestId, examData) => {
        console.log("Exam Data: ", examData); // Verificăm datele examenului
        const response = await fetch(`http://localhost:8000/requests/approveSecretary/${requestId}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ exam: examData }), // Trimite datele examenului
        });
        console.log(examData)
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
            {cereri.map((cerere) => (
                <div key={cerere.id} className="cerere">
                    {/* Afișează informațiile examenului dacă există */}
                    <p>Examen: {cerere.exam_details ? cerere.exam_details.name : "Niciun examen asociat"}</p>
                    <p>Profesor: {cerere.destinatar}</p>
                    <p>Status: {cerere.status}</p>
                    
                    {/* Butoane de aprobare */}
                    {cerere.status === "Pending" && (
                        <button onClick={() => handleApproveProfessor(cerere.id)}>Aprobă Profesor</button>
                    )}
                    {cerere.status === "ApprovedByProfessor" && (
                        <button onClick={() => handleApproveSecretary(cerere.id, cerere.exam_details)}>Aprobă Secretariat</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ColoanaCereri;
