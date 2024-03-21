import React from "react";

function NoteFooter({ children }) {
    return (
        <div className="note-item__footer">
            <p>
                Copyright &#169; 2024 - All Rights Reserved by
                <a href="https://github.com/SideeID" target="_blank"> Side ID</a>
            </p>
        </div>
    );
}
export default NoteFooter;