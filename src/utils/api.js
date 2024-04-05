const BASE_URL = 'https://notes-api.dicoding.dev/v1';

async function fetchWithToken(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
}

async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true, data: null };
    }

    localStorage.setItem('accessToken', responseJson.data.accessToken);
    return { error: false, data: responseJson.data };
}

async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function getUserLogged() {
    const response = await fetchWithToken(`${BASE_URL}/users/me`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
}

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function setAccessToken(accessToken) {
    return localStorage.setItem('accessToken', accessToken);
}

async function addNote({ id, title, body, owner, archived, createdAt }) {
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, body, owner, archived, createdAt }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function getAllNotes() {
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: [] };
    }

    return { error: false, data: responseJson.data };
}

async function getArchivedNotes() {
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, data: [] };
    }

    return { error: false, data: responseJson.data };
}

async function archiveNote(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function unarchiveNote(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
        method: 'POST',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

async function getNote(note_id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${note_id}`);
    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        return { error: true, message: responseJson.message, data: null };
    }

    return { error: false, data: responseJson.data };
}

async function deleteNote(id) {
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
        method: 'DELETE',
    });

    const responseJson = await response.json();

    if (responseJson.status !== 'success') {
        alert(responseJson.message);
        return { error: true };
    }

    return { error: false };
}

export {
    login,
    register,
    getUserLogged,
    addNote,
    getAllNotes,
    getArchivedNotes,
    archiveNote,
    unarchiveNote,
    getNote,
    deleteNote,
    getAccessToken,
    setAccessToken,
};
