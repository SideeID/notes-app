import React from "react";
import NoteItemBody from "./NoteItemBody";
import DeleteButton from "./common/DeleteButton";
import ArchiveButton from "./common/ArchiveButton";

function NoteItem({ title, body, id, archived, onDelete, onArchive }) {
    const archiveButtonText = archived ? "Restore" : "Archive";

    return (
        <div className={`note-item ${archived ? 'archived' : ''}`}>
            <NoteItemBody title={title} body={body} />
            <div className="button-container">
                <DeleteButton onDelete={() => onDelete(id)} />
                <ArchiveButton onArchive={() => onArchive(id)}>{archiveButtonText}</ArchiveButton>
            </div>
        </div>
    );
}


export default NoteItem