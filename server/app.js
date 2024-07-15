const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const notesRoutes = require('./routes/notes');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//ruta de notes.js
app.use('/api/notes', notesRoutes);


app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:' + PORT);

});

