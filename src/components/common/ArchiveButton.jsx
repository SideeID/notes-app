import React from "react";

function ArchiveButton({ onArchive, children, archived }) {
    const buttonText = archived ? "Restore" : children;

    return (
        <button onClick={onArchive} className="note-item__archive">
            {buttonText}
        </button>
    );
}

export default ArchiveButton;
