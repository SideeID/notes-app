import React from 'react';
import NoteItemBody from './NoteItemBody';
import DeleteButton from './common/DeleteButton';
import ArchiveButton from './common/ArchiveButton';
import { showFormattedDate } from '../utils';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NoteItem({
    title,
    body,
    createdAt,
    id,
    archived,
    onDelete,
    onArchive,
    onUnarchive,
}) {
    const archiveButtonText = archived ? 'Restore' : 'Archive';

    return (
        <div className={`note-item ${archived ? 'archived' : ''}`}>
            <Link to={`/note/${id}`} className='link-no-decoration'>
                <NoteItemBody
                    title={title}
                    body={body}
                    createdAt={showFormattedDate(createdAt)}
                />
            </Link>
            <div className='button-container'>
                <DeleteButton onDelete={() => onDelete(id)} id={id} />
                <ArchiveButton
                    onArchive={() => onArchive(id)}
                    onUnarchive={() => onUnarchive(id)}
                    archived={archived}
                >
                    {archiveButtonText}
                </ArchiveButton>
            </div>
        </div>
    );
}

NoteItem.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func.isRequired,
    onUnarchive: PropTypes.func.isRequired,
};

export default NoteItem;
