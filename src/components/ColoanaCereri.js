import React from "react";
import Cerere from "./Cerere";

const ColoanaCereri = ({ title, cereri }) => {
  return (
    <div style={styles.column}>
      <h2 style={styles.title}>{title}</h2>
      {cereri.map((cerere) => (
        <Cerere
          key={cerere.id}
          disciplina={cerere.disciplina}
          grupa={cerere.grupa}
          ziua={cerere.ziua}
          interval={cerere.interval}
          conflict={cerere.conflict}
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
