const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));


const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:`+PORT);
});
