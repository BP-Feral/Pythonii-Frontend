import React from "react";
const nume_mail = () =>{
    var nume="Nume profesor";
    return (
        <div>
            <label>Nume Profesor</label>
            <input type="text"
            name="nume_profesor"
            value={nume}
            placeholder="Nume profesor"
            />
        </div>
    );
};