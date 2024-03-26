import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AddNoteForm({ onAdd }) {
    const maxLength = 50;
    const navigate = useNavigate();

    const [newNote, setNewNote] = useState({
        title: "",
        body: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({
            ...newNote,
            [name]: value
        });
    };

    const handleAdd = () => {
        onAdd(newNote);
        setNewNote({
            title: "",
            body: "",
        });
        navigate('/')
    };

    const remainingChars = maxLength - newNote.title.length;

    return (
        <div className="add-note-form">
            <h2>Tambah catatan</h2>
            <label htmlFor="title">Judul: </label>
            <span>{remainingChars}/{maxLength}</span>
            <input type="text" name="title" value={newNote.title} onChange={handleInputChange} maxLength={maxLength} />
            <label htmlFor="body">Isi: </label>
            <textarea name="body" value={newNote.body} onChange={handleInputChange} />
            <div className="container-add-button">
                <button onClick={handleAdd}>Simpan</button>
            </div>
        </div>
    );
}

AddNoteForm.propTypes = {
    onAdd: PropTypes.func.isRequired
};

export default AddNoteForm;
