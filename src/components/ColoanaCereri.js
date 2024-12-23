import React, { useEffect, useState } from "react";
import Cerere from "./Cerere";

const ColoanaCereri = ({ title }) => {
  const [cereri, setCereri] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchCereri = async () => {
      try {
        const response = await fetch("/api/requests"); // Endpoint-ul backend-ului
        const data = await response.json(); // Transformăm răspunsul în JSON
        setCereri(data); // Setăm datele în state
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchCereri();
  }, []);

  return (
    <div style={styles.column}>
      <h2 style={styles.title}>{title}</h2>
      {cereri.map((cerere) => (
        <Cerere
          key={cerere.id}
          disciplina={cerere.exam.name} // Numele disciplinei din backend
          grupa={cerere.user.username} // Username-ul utilizatorului (poate fi interpretat ca grupă)
          ziua={cerere.exam.scheduled_date} // Ziua examenului
          interval={cerere.exam.scheduled_time} // Ora examenului
          conflict={cerere.status === "Rejected" ? "Conflict" : "No Conflict"} // Logică pentru conflict
        />
      ))}
    </div>
  );
};

const styles = {
  column: {
    flex: 1,
    padding: "10px",
  },
  title: {
    textAlign: "center",
    color: "#ffffff",
    marginBottom: "20px",
  },
};

export default ColoanaCereri;
