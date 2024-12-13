import React from "react";

const Cerere = ({ disciplina, grupa, ziua, interval, conflict }) => {
  return (
    <div
      style={{
        ...styles.cardContainer,
        backgroundColor: conflict ? "#C74A57" : "#3A5F8A",
      }}
    >
      <div style={styles.content}>
        <div style={styles.iconContainer}>
          <i className="fa fa-calendar" style={styles.icon}></i>
        </div>
        <div style={styles.textContainer}>
          <p>{disciplina}</p>
          <p>{grupa}</p>
          <p>{ziua}</p>
          <p>{interval}</p>
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
