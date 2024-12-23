import React from "react";
import Cerere from "./Cerere";

const ColoanaCereri = ({ title, cereri }) => {
  return (
    <div style={styles.column}>
      <h2 style={styles.title}>{title}</h2>
      {cereri.map((cerere) => (
        <Cerere
          key={cerere.id}
          disciplina={cerere.exam.name} // Numele disciplinei
          grupa={cerere.user.username} // Username-ul utilizatorului
          ziua={cerere.exam.scheduled_date} // Ziua examenului
          interval={cerere.exam.scheduled_time} // Ora examenului
          conflict={cerere.status === "Rejected" ? "Conflict" : "No Conflict"} // Statusul cererii
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
