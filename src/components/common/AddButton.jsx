import React from "react";
import { Link } from "react-router-dom";

function AddButton() {
    return (
        <div className="note-container__add">
            <Link to="/add" className="note-item__add">Tambah</Link>
        </div>
    );
}

export default AddButton;
