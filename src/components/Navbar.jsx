import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSignOutAlt, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { LanguageContext } from './LanguageContext';

function Navbar({ keyword, onSearch, logout, authedUser }) {
    const { theme, toggleTheme } = useTheme();
    const { language, changeLanguage } = useContext(LanguageContext);

    const handleLanguageChange = () => {
        const newLanguage = language === 'en' ? 'id' : 'en';
        changeLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <nav className='note-item__navbar'>
            <Link className='link-no-decoration' to='/'>
                <h1>Notes App</h1>
            </Link>
            <input
                className='search-bar'
                type='text'
                placeholder={
                    language === 'en'
                        ? 'Search by title...'
                        : 'Cari berdasarkan judul...'
                }
                value={keyword}
                onChange={(e) => onSearch(e.target.value)}
            />
            <button className='link-no-decoration' onClick={logout}>
                {authedUser && <span className='name'>{authedUser.name}</span>}
                <FaSignOutAlt className='archived_icon' />
            </button>
            <div className='button-navbar-right'>
                <button className='link-no-decoration' onClick={toggleTheme}>
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
                <button
                    className='link-no-decoration'
                    onClick={handleLanguageChange}
                >
                    {language === 'en' ? 'ID' : 'EN'}
                </button>
            </div>
        </nav>
    );
}

Navbar.propTypes = {
    keyword: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    authedUser: PropTypes.object.isRequired,
};

export default Navbar;
