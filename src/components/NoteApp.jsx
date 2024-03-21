import React from "react";
import NoteList from "./NoteList";
import { getData } from '../utils/data'
import Navbar from "./Navbar";
import AddButton from "./common/AddButton";

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getData(),
            filteredNotes: getData()
        };
        this.onHandleDelete = this.onHandleDelete.bind(this);
        this.onHandleSearch = this.onHandleSearch.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleArchiveNote = this.handleArchiveNote.bind(this);
    }

    onHandleDelete(id) {
        const updatedNotes = this.state.notes.filter(note => note.id !== id);
        const updatedFilteredNotes = this.state.filteredNotes.filter(note => note.id !== id);
        this.setState({ notes: updatedNotes, filteredNotes: updatedFilteredNotes });
    }

    onHandleSearch(searchTerm) {
        const filteredNotes = this.state.notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
        this.setState({ filteredNotes });
    }

    handleAddNote(newNote) {
        const updatedNotes = [newNote, ...this.state.notes];
        this.setState({ notes: updatedNotes, filteredNotes: updatedNotes });
    }

    handleArchiveNote(id) {
        const updatedNotes = this.state.notes.map(note => {
            if (note.id === id) {
                return { ...note, archived: !note.archived };
            }
            return note;
        });
        this.setState({ notes: updatedNotes, filteredNotes: updatedNotes });
    }

    render () {
        const activeNotes = this.state.filteredNotes.filter(note => !note.archived);
        const archivedNotes = this.state.filteredNotes.filter(note => note.archived);

        return (
            <div className="note-app">
                <Navbar onSearch={this.onHandleSearch} />
                <AddButton onAdd={this.handleAddNote} />
                <h2>Catatan Aktif</h2>
                <NoteList notes={activeNotes} onDelete={this.onHandleDelete} onArchive={this.handleArchiveNote} />
                <h2>Catatan Diarsipkan</h2>
                <NoteList notes={archivedNotes} onDelete={this.onHandleDelete} onArchive={this.handleArchiveNote} />
            </div>
        );
    }
}

export default NoteApp;
