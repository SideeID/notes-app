import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from 'prop-types';

function NoteList({ notes, onDelete, onArchive, onUnarchive }) {
    if (notes.length === 0) {
        return <p className="note-list__empty">Tidak ada catatan</p>;
    }

    return (
        <div className="note-list">
            {notes.map((note) => {
                // return <NoteItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} createdAt={note.createdAt} {...note} />;
                return <NoteItem key={note.id} id={note.id} onDelete={onDelete} onArchive={onArchive} onUnarchive={onUnarchive} createdAt={note.createdAt} {...note} />;
            })}
        </div>
    );
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired
};

export default NoteList;
