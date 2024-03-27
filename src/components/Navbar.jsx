import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

function Navbar({ keyword, onSearch }) {

    return (
        <nav className="note-item__navbar">
            <Link className="link-no-decoration" to="/">
                <h1>Notes App</h1>
            </Link>
            <input
                className="search-bar"
                type="text"
                placeholder="Cari berdasarkan judul..."
                value={keyword}
                onChange={(e) => onSearch(e.target.value)}
            />
        </nav>
    );
}

Navbar.propTypes = {
    keyword: PropTypes.string,
    onSearch: PropTypes.func.isRequired
};


export default Navbar;
