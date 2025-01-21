import React, { useState, useEffect } from "react";
import ColoanaCereri from "../components/ColoanaCereri";
import Nav from "../components/Navbar";
import '../styles/Cereri.css';


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
    <div className="cereri-page">
  <Nav />
  <div className="page-container">
    <header className="page-header">
      <h1>Planificări Examene iarnă 2024-2025</h1>
    </header>
    {loading ? (
      <p className="page-message">Se încarcă cererile...</p>
    ) : error ? (
      <p className="page-message">{error}</p>
    ) : (
      <div className="columns-container">
        <ColoanaCereri title="Toate Cererile" cereri={cereri} />
      </div>
    )}
  </div>
</div>
  );
};

export default Cereri;
