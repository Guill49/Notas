const { response } = require("express");

document.addEventListener('DOMContentLoaded', () => {
    const getAllNotesBtn = document.getElementById('getAllNotes');
    const createNoteBtn = document.getElementById('create-Note');
    const notesContainer = document.getElementById('notesContainer');


    //obtener notas
    getAllNotesBtn.addEventListener('click', () => {
        fetch('http://localhost:3000/notes').then(response => response.json())
        .then(data => {
            notesContainer.innerHTML = '';

            data.forEach(note => {
                const noteElement =createElement(note);
                notesContainer.appendChild(noteElement);
            });
        })
        .catch(error => console.error('error al traer notas', error));

    });

    // crear nueva nota
     createNoteBtn.addEventListener('click', () =>{
        const newData ={
            title: 'Nueva nota',
            content: 'contenido de la nueva nota',
            tags:['nueva-etiqueta']
        };

        fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newData),
        })
        .then(response => response.json())
        .then(data =>{
            console.log('nueva nota creads', data);
            const noteElement = createNoteElement(data);
            notesContainer.appendChild(noteElement);
        })
        .catch(error => console.error('error al crear nota', error));

    });

    function deleteNote(noteId){
        fetch('http://localhost:3000/notes/${noteId}',{
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('nota eliminada', data);
            getAllNotesBtn.click();
        })
        .catch(error => console.error('error al eliminar nota', error));
    }

    function editNote(noteId){
        console.log('editar nota con ID:', noteId)
    }

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
