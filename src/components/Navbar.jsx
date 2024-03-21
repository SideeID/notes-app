import React from "react";

function Navbar({ onSearch }) {
    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        onSearch(searchTerm);
    };

    return (
        <nav className="note-item__navbar">
            <h1>Notes App</h1>
            <input
                type="text"
                placeholder="Cari berdasarkan judul..."
                onChange={handleSearch}
            />
        </nav>
    );
}

export default Navbar;