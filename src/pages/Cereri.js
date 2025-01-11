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
        const response = await fetch("http://localhost:8000/requests/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Cereri primite:", data);

          // Filtrăm cererile pentru a include doar cele cu status "Pending" (pentru profesori)
          // sau "ApprovedByProfessor" (pentru secretariat)
          const filteredCereri = data.filter(
            (cerere) =>
              cerere.status === "Pending" || cerere.status === "ApprovedByProfessor"
          );
          setCereri(filteredCereri);
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
            <ColoanaCereri title="Toate Cererile" cereri={cereri} /> {/* Afișăm doar cererile filtrate */}
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
    flexDirection: "column",  // Modificăm pentru a afișa toate cererile într-o coloană
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
