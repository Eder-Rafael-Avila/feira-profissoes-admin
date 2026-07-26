const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql2');
const session = require('express-session');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'admin_feira'
})

conexao.connect((erro) => {
    if (erro) {
        console.log('Houve um erro ao conectar no MySQL: ', erro);
        return;
    }

    console.log('Sucesso ao conectar no MySQL!');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'rithielly',
    resave: false,
    saveUninitialized: false
}));

app.get('/dashboard', verificarLogin, (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'))
})

app.post('/login', (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const sql = `
        select * from administradores
        where email = ?;
    `

    conexao.query(
        sql,
        [email],
        (erro, resultado) => {

            if (erro) {
                console.log('Erro ao encontrar: ', erro);
                return;
            }
            
            if (resultado.length === 0) {
                console.log('Nenhum usuário encontrado');
                res.send('Nenhum usuário encontrado');
                return;
            }
            
            console.log(resultado);

            const administrador = resultado[0];

            if (password === administrador.senha) {
                req.session.administrador = {
                    id: administrador.id,
                    nome: administrador.nome,
                    email: administrador.email
                };
                res.redirect('/dashboard');
            } else {
                console.log('Senha incorreta.');
                res.send('Senha incorreta.');
            }

        }
    )

})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
})

app.listen(3000, () => {
    console.log('Servidor rodando!');
})





function verificarLogin(req, res, next) {

    if(!req.session.administrador) {
        return res.redirect('/');
    }

    next();

}