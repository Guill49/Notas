document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const createNoteButton = document.getElementById('create-note');

    const fetchNotes = async () => {
        const res = await fetch('/api/notes');
        const notes = await res.json();
        renderNotes(notes);
    };

    const renderNotes = (notes) => {
        notesList.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
        <h2>${note.title}</h2>
        <p>${note.content}</p>
        <small>Created: ${new Date(note.createdAt).toLocaleString()}</small>
        <small>Updated: ${new Date(note.updatedAt).toLocaleString()}</small>
      `;
            notesList.appendChild(noteElement);

        });
    };

    createNoteButton.addEventListener('click', () => {
        const title = prompt('Título de la nota:');
        const content = prompt('Contenido de la nota:');
        if (title && content) {
            createNote({
                title,
                content,
                tags: []
            });
        }
    });

    const createNote = async (note) => {
        const res = await fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        });
        if (res.ok) {
            fetchNotes();
        }
    };

    fetchNotes();
});
