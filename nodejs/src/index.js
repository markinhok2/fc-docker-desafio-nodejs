const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const mysqlConfig = {
    host: 'mysql',
    user: 'root',
    password: 'fcpassword',
    database: 'nodedb'
}

function createPeopleTable() {
    const connection = mysql.createConnection(mysqlConfig)

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err)
            return
        }

        const createTableSQL = `CREATE TABLE IF NOT EXISTS people (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL)`

        connection.query(createTableSQL, (err) => {
            if (err) {
                console.error('Erro ao criar a tabela "people":', err)
                return
            } else {
                console.log('Tabela "people" criada com sucesso (ou já existe).')
            }
            connection.end()
        })
    })
}

function insertPeople() {
    const connection = mysql.createConnection(mysqlConfig)

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err)
            return
        }

        const peopleName = 'Marcos Aurélio ' + Math.floor(Math.random() * 500)
        const insertSQL = 'INSERT INTO people (name) VALUES (?)';

        connection.query(insertSQL, [peopleName], (err, result) => {
            if (err) {
                console.error(`Erro ao inserir o registro '` + peopleName + `' na tabela "people":`, err);
            } else {
                console.log(`Registro inserido com sucesso! Nome: ${peopleName}`);
            }

            connection.end();
        });
    });
}

createPeopleTable()

insertPeople()

app.get('/', (req, res) => {
    const connection = mysql.createConnection(mysqlConfig)

    connection.connect((err) => {
        if (err) {
            console.error('Erro ao conectar ao banco de dados:', err)
            res.status(500).send('Erro interno do servidor')
            return
        }

        const sqlQuery = 'SELECT name FROM people'

        connection.query(sqlQuery, (err, results) => {
            if (err) {
                console.error('Erro ao executar a consulta:', err)
                res.status(500).send('Erro interno do servidor')
                return
            }

            const htmlList = '<h1>Full Cycle Rocks!</h1><h4>Lista de pessoas:</h4><ul>' + results.map(row => `<li>${row.name}</li>`).join('') + '</ul>'

            connection.end()

            res.send(htmlList)
        })
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})