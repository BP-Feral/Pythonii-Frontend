import React from "react";

const Cerere = ({ disciplina_id, grupa, ziua, interval, conflict }) => {
  // Funcție pentru a formata data
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    // Verificăm dacă data este validă
    if (isNaN(parsedDate)) {
      return date; // Dacă data nu este validă, returnăm data primită de la backend
    }
    return parsedDate.toLocaleDateString("ro-RO");  // Formatăm data în format românesc
  };

  // Funcție pentru a formata ora
  const formatTime = (time) => {
    // Verificăm dacă 'time' este valid
    if (!time) {
      return time || "Ora necunoscută";  // Dacă 'time' nu este valid, returnăm "Ora necunoscută"
    }

    const [hours, minutes] = time.split(":");

    // Dacă formatul nu este corect, returnăm un mesaj de eroare
    if (!hours || !minutes) {
      return "Ora invalidă";
    }

    return `${hours}:${minutes}`;  // Returnăm ora formatată
  };

  return (
    <div
      style={{
        ...styles.cardContainer,
        backgroundColor: conflict === "Conflict" ? "#C74A57" : "#3A5F8A",  // Colorare pe baza conflictului
      }}
    >
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <i className="fa fa-calendar" style={styles.icon}></i>
        </div>
        <div style={styles.textContainer}>
          <p><strong>Disciplina ID:</strong> {disciplina_id || "N/A"}</p> {/* Aici am înlocuit cu disciplina_id */}
          <p><strong>Grupa:</strong> {grupa || "N/A"}</p>
          <p><strong>Ziua:</strong> {formatDate(ziua)}</p>
          <p><strong>Interval:</strong> {formatTime(interval)}</p>
        </div>
      </div>
      <div style={styles.actions}>
        <button style={styles.button}>
          <i className="fa fa-check"></i>
        </button>
        <button style={styles.button}>
          <i className="fa fa-times"></i>
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
    marginBottom: "15px",
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: "15px",
    fontSize: "20px",
  },
  textContainer: {
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    margin: "5px 0",
  },
  icon: {
    fontSize: "24px",
  },
};

export default Cerere;
