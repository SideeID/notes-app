import React, { useState } from "react";

function AddButton({ onAdd }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newNote, setNewNote] = useState({
        id: +new Date(),
        title: "",
        body: "",
        archived: false,
        createAt: new Date()
    });
    const maxLength = 50;

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
            id: +new Date(),
            title: "",
            body: "",
            archived: false,
            createAt: new Date()
        });
        setIsOpen(false);
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const remainingChars = maxLength - newNote.title.length;

    return (
        <div className="note-container__add">
            <button onClick={togglePopup} className="note-item__add">Tambah</button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Tambah catatan</h2>
                        <label htmlFor="title">Judul: </label>
                        <span>{remainingChars}/{maxLength}</span>
                        <input type="text" name="title" value={newNote.title} onChange={handleInputChange} maxLength={maxLength} required />
                        <label htmlFor="body">Isi: </label>
                        <textarea name="body" value={newNote.body} onChange={handleInputChange} />
                        <div className="container-add-button">
                            <button onClick={handleAdd}>Simpan</button>
                            <button onClick={togglePopup}>Batal</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddButton;
