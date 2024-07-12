const express = require('express');
const bodyParser = require('body-parser');
const notesRoutes = require('./routes/notes');
const app = express();
const port = 3000;

app.use('/api/notes', notesRoutes);
app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    
});

