const express = require('express');
const router = express.Router();
//para generar identificadores unicos para las notas:
const { v4: uuidv4 } = require('uuid');
// se crea array para almacenar notas en memoriaa
let notes = [];


//obtener todas las notas:
router.get('/', (req, res) => {
    res.json(notes);
});


// GET obtener notas por id:
router.get('/:id', (req, res) => {
    const note = notes.find(n => n.id === req.params.id);
    if (!note) return res.status(404).send('Nota no seencuentra');
    res.json(note);
});

// PUT actualizar una nota
router.put('/:id', (req, res) => {
    const { title, content, tags } = req.body;
    const noteIndex = notes.findIndex(n => n.id === req.params.id);
    if (noteIndex === -1) return res.status(404).send('Nota no encontrada');

    notes[noteIndex] = {
        ...notes[noteIndex],
        title: title || notes[noteIndex].title,
        content: content || notes[noteIndex].content,
        tags: tags || notes[noteIndex].tags,
        updatedAt: new Date()
    };

    res.json(notes[noteIndex]);
});


// POST ccreae una nueva
router.post('/', (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) return res.status(400).send('campos obligatorios');

    const newNote = {
        id: uuidv4(),
        title,
        content,
        tags: tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
    };

    notes.push(newNote);
    res.status(201).json(newNote);
});


// borrar una nota
router.delete('/:id', (req, res) => {
    notes = notes.filter(n => n.id !== req.params.id);
    res.status(204).send();
});

module.exports = router;
