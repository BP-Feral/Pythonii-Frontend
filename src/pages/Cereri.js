import React, { useState, useEffect } from "react";
import ColoanaCereri from "../components/ColoanaCereri.js";


const Cereri = () => {
  const [cereri, setCereri] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token-ul de autentificare
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCereri(data);
        } else {
          console.error("Eroare la preluarea cererilor:", response.status);
        }
      } catch (error) {
        console.error("Eroare de rețea:", error);
      }
    };

    fetchRequests();
  }, []);

  // Împarte cererile în funcție de status (dacă este nevoie)
  const cereriTitular = cereri.filter((cerere) => cerere.request_type === "ScheduleRequest");
  const cereriAsistent = cereri.filter((cerere) => cerere.request_type === "RescheduleRequest");

  return (
    <div style={styles.pageContainer}>
      <header style={styles.header}>
        <h1>Planificări Examene iarnă 2024-2025</h1>
      </header>
      <div style={styles.columnsContainer}>
        <ColoanaCereri title="Titular" cereri={cereriTitular} />
        <ColoanaCereri title="Asistent" cereri={cereriAsistent} />
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
    gap: "20px",
  },
};

export default Cereri;
