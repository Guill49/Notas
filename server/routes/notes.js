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
    const note = notes.find(note => note.id === req.params.id);
    if (!note) {
        return res.status(404).send('Nota no seencuentra');
    }
    res.json(note);
});

// PUT actualizar una nota
router.put('/:id', (req, res) => {
    const { title, content, tags } = req.body;
    const note = notes.find(note => note.id === req.params.id);
    if (!note) {
        return res.status(404).send('Nota no encontrada');
    }
    if (!title || !content) {
        return res.status(400).send('El titulo y conttenido obligatorios');
    }
    note.title = title;
    note.content = content;
    note.tags = tags || [];
    note.updatedAt = new Date().toISOString();
    res.json(note)
});


// POST ccreae una nueva
router.post('/', (req, res) => {
    const { title, content, tags } = req.body;
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
    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (!noteIndex) {
      return res.status(404).send('Nota no se encuentra');
    }
  
    notes.splice(noteIndex, 1);
    res.status(204).send();
  });

module.exports = router;
