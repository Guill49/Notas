const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));


app.use('/notes', notesRouter);

app.get('/', (req, res) =>{
  res.send('servidoe de notas funcionando');
});


app.post('/create-Note', (req, res) =>{
  console.info('Create has been called..\n');
  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;
  const tags = req.body.tags;

  res.send('data received');
})

app.use((req, res, next) => {
  res.status(404).send('pagina no encontrada');
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:'+PORT);
});
