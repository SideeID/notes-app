import React from "react";
import { useParams } from "react-router-dom";
import { showFormattedDate } from "../utils";
import DeleteButton from "./common/DeleteButton";
import ArchiveButton from "./common/ArchiveButton";
import PropTypes from 'prop-types';

function NoteDetail({ notes, onDelete, onArchive, onUnarchive }) {
    const { id } = useParams();
    const note = notes.find(note => note.id === id);

    if (!note) {
        return <p className="note-list__empty">Catatan tidak ditemukan</p>;
    }

    const archiveButtonText = note.archived ? "Restore" : "Archive";

    return (
        <div className="note-detail">
            <h2>{note.title}</h2>
            <p>{note.body}</p>
            <p>Dibuat pada: {showFormattedDate(note.createdAt)}</p>
            <div className="button-container">
                <DeleteButton onDelete={() => onDelete(id)} id={id} />
                <ArchiveButton onArchive={() => onArchive(id)} onUnarchive={() => onUnarchive(id)} archived={note.archived}>
                    {archiveButtonText}
                </ArchiveButton>
            </div>
        </div>
    );
}

NoteDetail.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired
};

export default NoteDetail;