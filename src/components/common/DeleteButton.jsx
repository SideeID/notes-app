import React from 'react';
import PropTypes from 'prop-types';

function DeleteButton({ onDelete, id }) {
    return (
        <button onClick={() => onDelete(id)} className='note-item__delete'>
            Hapus
        </button>
    );
}

DeleteButton.propTypes = {
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};

export default DeleteButton;
