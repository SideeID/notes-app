import React from 'react';
import { createRoot } from 'react-dom/client';
import NoteApp from './components/NoteApp';
import { BrowserRouter } from 'react-router-dom';
import './styles/style.css';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <NoteApp />
    </BrowserRouter>
);
