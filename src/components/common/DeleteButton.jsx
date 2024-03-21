import React from "react";

function DeleteButton({ onDelete, id }) {
    return (
      <button onClick={() => onDelete(id)} className="note-item__delete">
        Hapus
      </button>
    );
  }

export default DeleteButton