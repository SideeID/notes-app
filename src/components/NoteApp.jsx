import React from "react";
import { FaArchive, FaHome } from 'react-icons/fa';
import { useSearchParams, Routes, Route, Link } from "react-router-dom"; // Tambahkan Link dari react-router-dom
import NoteList from "./NoteList";
import Navbar from "./Navbar";
import AddButton from "./common/AddButton";
import AddNoteForm from "./AddNote";
import NoteFooter from "./NoteFooter";
import NoteDetail from "./NodeDetail";
import NotFoundPage from "./NotFound";
import { getAllNotes, addNote, deleteNote, archiveNote, unarchiveNote } from "../utils/local-data";

function NoteAppWrapper() {
    const [searchParams, setSearchParams] = useSearchParams();

    const keyword = searchParams.get("search");

    const handleKeywordChange = (keyword) => {
        setSearchParams({ search: keyword });
    };

    return <NoteApp defaultKeyword={keyword} onKeywordChange={handleKeywordChange} />;
}

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getAllNotes(),
            filteredNotes: getAllNotes(),
            keyword: props.defaultKeyword || "",
        };
        this.onHandleDelete = this.onHandleDelete.bind(this);
        this.onHandleSearch = this.onHandleSearch.bind(this);
        this.handleAddNote = this.handleAddNote.bind(this);
        this.handleArchiveNote = this.handleArchiveNote.bind(this);
        this.handleUnarchiveNote = this.handleUnarchiveNote.bind(this);
    }

    onHandleDelete(id) {
        deleteNote(id);
        this.setState({
            notes: getAllNotes(),
            filteredNotes: getAllNotes(),
        });
    }

    onHandleSearch(searchTerm) {
        const filteredNotes = this.state.notes.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({ filteredNotes, keyword: searchTerm });
        this.props.onKeywordChange(searchTerm);
    }

    handleAddNote(newNote) {
        addNote(newNote);
        this.setState({
            notes: getAllNotes(),
            filteredNotes: getAllNotes(),
        });
    }

    handleArchiveNote(id) {
        archiveNote(id);
        this.setState({
            notes: getAllNotes(),
            filteredNotes: getAllNotes()
        });
    }

    handleUnarchiveNote(id) {
        unarchiveNote(id);
        this.setState({
            notes: getAllNotes(),
            filteredNotes: getAllNotes()
        });
    }

    render() {
        const activeNotes = this.state.filteredNotes.filter((note) => !note.archived);
        const archivedNotes = this.state.filteredNotes.filter((note) => note.archived);

        return (
            <div className="note-app">
                <Navbar onSearch={this.onHandleSearch} />
                <div className="navigation">
                    <Link to="/">
                        <FaHome className="archived_icon" />
                        <span>Aktif</span>
                    </Link>
                    <Link to="/archived">
                        <FaArchive className="archived_icon" />
                        <span>Arsip</span>
                    </Link>
                </div>
                <AddButton onAdd={this.handleAddNote} />

                <Routes>
                    <Route path="/" element={<NoteList notes={activeNotes} onDelete={this.onHandleDelete} onArchive={this.handleArchiveNote} />} />
                    <Route path="/add" element={<AddNoteForm onAdd={this.handleAddNote} />} />
      
                    <Route path="/archived" element={<NoteList notes={archivedNotes} onDelete={this.onHandleDelete} onArchive={this.handleUnarchiveNote} />} />
                    <Route path="/note/:id" element={<NoteDetail notes={this.state.notes} onDelete={this.onHandleDelete} onArchive={this.handleArchiveNote} onUnarchive={this.handleUnarchiveNote} />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <NoteFooter />
            </div>
        );
    }
}

export default NoteAppWrapper;
