const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.psot('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.listen(3000, () => {
    console.log('Servidor rodando!');
})