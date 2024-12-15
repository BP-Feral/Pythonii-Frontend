import React, { useState, useEffect } from "react";
import Nav from "../components/Navbar.js";

const CereriProfesorSecretariat = () => {
  const [cereri, setCereri] = useState([]);
  const [asistenti, setAsistenti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:8000/api/requests/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCereri(data);
        } else {
          setError(`Eroare server: ${response.status}`);
        }
      } catch (error) {
        setError("Eroare de rețea: Verifică conexiunea sau serverul backend.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAsistenti = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/asistenti/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAsistenti(data);
        } else {
          setError(`Eroare la preluarea listei de asistenți: ${response.status}`);
        }
      } catch (error) {
        console.error("Eroare de rețea:", error);
      }
    };

    fetchRequests();
    fetchAsistenti();
  }, []);

  const handleApprove = async (cerereId, asistentId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/requests/${cerereId}/approve/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ asistent_id: asistentId }),
      });

      if (response.ok) {
        setCereri((prevCereri) =>
          prevCereri.filter((cerere) => cerere.id !== cerereId)
        );
        alert("Cererea a fost aprobată!");
      } else {
        alert("A apărut o problemă la aprobare.");
      }
    } catch (error) {
      console.error("Eroare la aprobarea cererii:", error);
    }
  };

  return (
    <div>
      <Nav />
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <h1>Cereri pentru Secretar</h1>
        </header>

        {error && <div style={styles.error}>{error}</div>}

        {isLoading ? (
          <div style={styles.loading}>Se încarcă cererile...</div>
        ) : cereri.length === 0 ? (
          <div style={styles.noRequests}>Nu există cereri disponibile.</div>
        ) : (
          <div style={styles.requestsContainer}>
            {cereri.map((cerere) => (
              <div key={cerere.id} style={styles.requestCard}>
                <p>
                  <strong>Tip Cerere:</strong> {cerere.request_type}
                </p>
                <p>
                  <strong>Detalii:</strong> {cerere.details}
                </p>
                <div>
                  <label htmlFor={`asistent-${cerere.id}`}>
                    Selectează asistent:
                  </label>
                  <select
                    id={`asistent-${cerere.id}`}
                    style={styles.select}
                    onChange={(e) =>
                      (cerere.selectedAsistent = e.target.value)
                    }
                  >
                    <option value="">-- Selectează --</option>
                    {asistenti.map((asistent) => (
                      <option key={asistent.id} value={asistent.id}>
                        {asistent.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  style={styles.approveButton}
                  onClick={() =>
                    handleApprove(cerere.id, cerere.selectedAsistent)
                  }
                  disabled={!cerere.selectedAsistent}
                >
                  Aproba cererea
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: "#243B55",
    color: "#ffffff",
    minHeight: "100vh",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  requestsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  requestCard: {
    backgroundColor: "#3a4d6b",
    padding: "15px",
    borderRadius: "8px",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  loading: {
    textAlign: "center",
  },
  noRequests: {
    textAlign: "center",
    fontStyle: "italic",
  },
  select: {
    margin: "10px 0",
    padding: "5px",
    width: "100%",
  },
  approveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CereriProfesorSecretariat;
