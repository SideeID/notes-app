import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaArchive } from 'react-icons/fa';
import { LanguageContext } from './LanguageContext';

const Navigation = () => {
    const { language } = useContext(LanguageContext);

    return (
        <div className='navigation'>
            <Link to='/'>
                <FaHome className='archived_icon' />
                <span>{language === 'en' ? 'Home' : 'Beranda'}</span>
            </Link>
            <Link to='/archived'>
                <FaArchive className='archived_icon' />
                <span>{language === 'en' ? 'Archived' : 'Arsip'}</span>
            </Link>
        </div>
    );
};

export default Navigation;
