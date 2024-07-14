const express = require('express');
const path = require('path')

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    console.log('loading home..');
    res.send('hola mundo');
});

app.listen(PORT, () => {
    console.log('Servidor corriendo en http://localhost:'+PORT);
    
});

