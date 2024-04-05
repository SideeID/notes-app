import React, { useState, useEffect } from 'react';
import NoteList from './NoteList';
import Navbar from './Navbar';
import AddButton from './common/AddButton';
import AddNoteForm from './AddNote';
import NoteFooter from './NoteFooter';
import NoteDetail from './NodeDetail';
import NotFoundPage from './NotFound';
import LoginPage from '../pages/LoginPages';
import RegisterPage from '../pages/RegisterPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { LanguageProvider } from './LanguageContext';
import Navigation from './NavigationIcon';
import {
    getUserLogged,
    addNote,
    getAllNotes,
    getArchivedNotes,
    archiveNote,
    unarchiveNote,
    deleteNote,
    setAccessToken,
} from '../utils/api';

function NoteApp() {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const handleSearch = async (keyword) => {
        setKeyword(keyword);
        const search = keyword ? keyword.toLowerCase() : '';
        const filteredNotes = notes.filter(
            (note) => note.title && note.title.toLowerCase().includes(search)
        );
        setFilteredNotes(filteredNotes);
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        fetchNotes();
    };

    const handleAddNote = async (newNote) => {
        await addNote(newNote);
        fetchNotes();
    };

    const handleArchiveNote = async (id) => {
        await archiveNote(id);
        fetchNotes();
    };

    const handleUnarchiveNote = async (id) => {
        await unarchiveNote(id);
        fetchNotes();
    };

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const { data } = await getAllNotes();
            setNotes(data);
            setFilteredNotes(data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArchivedNotes = async () => {
        try {
            setLoading(true);
            const { data } = await getArchivedNotes();
            setNotes(data);
            setFilteredNotes(data);
        } catch (error) {
            console.error('Error fetching archived notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setAuthedUser(null);
        setAccessToken(null);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await getUserLogged();
                if (data) {
                    setAuthedUser(data);
                } else {
                    setAuthedUser(null);
                }
                setInitializing(false);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setInitializing(false);
                setLoading(false);
            }
        };

        fetchData();
        fetchNotes();
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            fetchNotes();
        } else if (location.pathname === '/archived') {
            fetchArchivedNotes();
        }
    }, [location.pathname]);

    if (initializing || loading) {
        return <div>Loading...</div>;
    }

    if (!authedUser) {
        return (
            <div className='note-app'>
                <header className='login'>
                    <h2>Notes App</h2>
                </header>
                <main>
                    <Routes>
                        <Route
                            path='/*'
                            element={
                                <LoginPage
                                    loginSuccess={(data) => setAuthedUser(data)}
                                />
                            }
                        />
                        <Route path='/register' element={<RegisterPage />} />
                    </Routes>
                </main>
            </div>
        );
    }

    return (
        <LanguageProvider>
            <ThemeProvider>
                <div className='note-app'>
                    <Navbar
                        keyword={keyword}
                        onSearch={handleSearch}
                        logout={handleLogout}
                        authedUser={authedUser}
                    />
                    <Navigation />
                    <AddButton onAdd={handleAddNote} />
                    {loading && <div>Loading...</div>}
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <NoteList
                                    notes={
                                        filteredNotes &&
                                        filteredNotes.filter(
                                            (note) => !note.archived
                                        )
                                    }
                                    onDelete={handleDelete}
                                    onArchive={handleArchiveNote}
                                    onUnarchive={handleUnarchiveNote}
                                    keyword={keyword}
                                />
                            }
                        />
                        <Route
                            path='/add'
                            element={<AddNoteForm onAdd={handleAddNote} />}
                        />
                        <Route
                            path='/archived'
                            element={
                                <NoteList
                                    notes={
                                        filteredNotes &&
                                        filteredNotes.filter(
                                            (note) => note.archived
                                        )
                                    }
                                    onDelete={handleDelete}
                                    onArchive={handleUnarchiveNote}
                                    onUnarchive={handleUnarchiveNote}
                                    keyword={keyword}
                                />
                            }
                        />
                        <Route
                            path='/note/:id'
                            element={
                                <NoteDetail
                                    notes={notes}
                                    onDelete={handleDelete}
                                    onArchive={handleArchiveNote}
                                    onUnarchive={handleUnarchiveNote}
                                />
                            }
                        />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                    <NoteFooter />
                </div>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default NoteApp;
