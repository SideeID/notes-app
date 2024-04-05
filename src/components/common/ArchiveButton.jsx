import React from 'react';
import PropTypes from 'prop-types';

function ArchiveButton({ onArchive, children, archived, onUnarchive }) {
    const buttonText = archived ? 'Restore' : children;

    return (
        <button
            onClick={archived ? onUnarchive : onArchive}
            className='note-item__archive'
        >
            {buttonText}
        </button>
    );
}

ArchiveButton.propTypes = {
    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired,
    archived: PropTypes.bool.isRequired,
    children: PropTypes.string.isRequired,
};

export default ArchiveButton;
