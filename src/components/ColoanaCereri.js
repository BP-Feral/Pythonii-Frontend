import React, { useState, useEffect } from "react";
import "../styles/ColoanaCereri.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          toast.error("Eroare la încărcarea cererilor.", {
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
      toast.error("Cererea a fost respinsă!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
      setCereri(cereri.filter((cerere) => cerere.id !== requestId));
    } else {
      toast.error("Eroare la respingerea cererii.", {
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
  const handleRejectProfessor = async (requestId) => {
    const response = await fetch(`http://localhost:8000/requests/approveProfessor/${requestId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ action: "reject" }),
    });
  
    if (response.ok) {
      toast.error("Cererea a fost respinsă de profesor!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Eroare la aprobarea cererii de către profesor.", {
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
      toast.success("Cererea a fost aprobată de profesor și a fost trimisă  la secretariat!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
    } else {
      const errorData = await response.json();
      toast.error(`Eroare: ${errorData.error}`, {
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
      toast.success("Cererea a fost aprobată de secretariat și examenul a fost salvat!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const errorData = await response.json();
      toast.error(`Eroare: ${errorData.error}`, {
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
    <div className="columna-cereri">
  <h3>{title}</h3>
  {cereri.length > 0 ? (
    cereri.map((cerere) => (
      <div key={cerere.id} className="cerere">
        {/* Conținutul cererii */}
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
        <p>Profesor: {cerere.destinatar ? cerere.destinatar : "Niciun profesor asociat"}</p>
        {cerere.status === "Pending" && (
          <div>
            <button onClick={() => handleApproveProfessor(cerere.id)}>Aprobă Cerere</button>
            <button onClick={() => handleRejectProfessor(cerere.id, "professor")}>Respinge Cerere</button>
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
    <p>Nu există cereri disponibile.</p>
  )}
      <ToastContainer />
</div>

  );
};

export default ColoanaCereri;