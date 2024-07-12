
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let notes = [];

router.get('/', (req, res) => {
    res.json(notes);
});

router.get('/:id', (req, res) => {
    const note = notes, find(n => n.id === req.params.id);
    if (!note) return res.status(404).send('Nota no encontrada');
    res.json(note);
});

router.post('/', (req, res) => {

    const { title, content, tags } = req.body;
    if (!title || !content) return res.status(400).send('titulo y contenido son obligatorios');

    const newNote = {
        id: uuidv4(),
        title,
        content,
        tags: tags || [],
        createAt: new Date(),
        updatedAt: new Date()
    };


