import React from 'react';
import "./Selectare_materie.css";
const Dropdown = () => {
  return (
    <div>
      <label htmlFor="dropdown">Alege o materie:</label>
      <select id="dropdown">
        <option value="Materie 1">Materie 1</option>
        <option value="Materie 2">Materie 2</option>
        <option value="Materie 3">Materie 3</option>
      </select>
    </div>
  );
};

export default Dropdown;
