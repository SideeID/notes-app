import React from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';

function AddButton() {
    const { language } = React.useContext(LanguageContext);
    return (
        <div className='note-container__add'>
            <Link to='/add' className='note-item__add'>
                {language === 'en' ? 'Add' : 'Tambah'}
            </Link>
        </div>
    );
}

export default AddButton;
