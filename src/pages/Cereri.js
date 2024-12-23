import React, { useState, useEffect } from "react";
import ColoanaCereri from "../components/ColoanaCereri";
import Nav from "../components/Navbar";

const Cereri = () => {
  const [cereri, setCereri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/request/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token-ul de autentificare
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCereri(data);
        } else {
          setError("Nu s-au putut prelua cererile. Verifică serverul.");
        }
      } catch (error) {
        setError("Eroare de rețea. Te rugăm să încerci din nou.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Împarte cererile în funcție de status (dacă este nevoie)
  const cereriTitular = cereri.filter((cerere) => cerere.request_type === "ScheduleRequest");
  const cereriAsistent = cereri.filter((cerere) => cerere.request_type === "RescheduleRequest");

  return (
    <div>
      <Nav />
      <div style={styles.pageContainer}>
        <header style={styles.header}>
          <h1>Planificări Examene iarnă 2024-2025</h1>
        </header>
        {loading ? (
          <p style={styles.message}>Se încarcă cererile...</p>
        ) : error ? (
          <p style={styles.message}>{error}</p>
        ) : (
          <div style={styles.columnsContainer}>
            <ColoanaCereri title="Titular" cereri={cereriTitular} />
            <ColoanaCereri title="Asistent" cereri={cereriAsistent} />
          </div>
        )}
        {!loading && !error && cereri.length === 0 && (
          <p style={styles.message}>Nu există cereri disponibile.</p>
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
  columnsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    fontSize: "18px",
    color: "#f8d7da",
  },
};

export default Cereri;
