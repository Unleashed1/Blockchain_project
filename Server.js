import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

// Configura la connessione al database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Blockchain2024!',
  database: 'luffyrunscore',
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
});
//creazione tabella
app.post('/api/dati', (req, res) => {
  const query = 'CREATE TABLE runscores (`score` int NOT NULL,`nickname` varchar(255) NOT NULL,`chiave` varchar(255) NOT NULL, PRIMARY KEY (`chiave`), UNIQUE KEY `score` (`score`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;';

  connection.query(query,  (err, results, fields) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ success: true });
  });
});

// Middleware per gestire i dati JSON
app.use(express.json());

// API per ottenere dati dal database
app.get('/api/dati', (req, res) => {
  const query = 'SELECT * FROM runscores';
  connection.query(query, (err, results, fields) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// API per aggiungere dati al database
app.post('/api/dati', (req, res) => {
  const { campo1, campo2 } = req.body;
  const query = 'INSERT INTO runscores (campo1, campo2) VALUES (?, ?)';
  const values = [campo1, campo2];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ success: true });
  });
});

// Altre API per aggiornare e eliminare dati possono essere aggiunte secondo necessità

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});


/*import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
const port = 3000;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Blockchain2024!',
  database: 'LuffyRunScores',
});

app.use(express.json());


app.post('/salva-dati', (req, res) => {
  const { dato1, dato2 } = req.body;

  const query = 'INSERT INTO runscores (score, nickname, chiave) VALUES (1, hvvr, rjhyfr)';
  connection.query(query, [dato1, dato2], (err, results, fields) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});





/*const express = require('express');
const mysql = require('mysql2');
const app = express();
//const cors = require('cors');

app.use(cors({ credentials: true }));

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Blockchain2024!',
    database: 'LuffyRunScores',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Errore di connessione al database:', err);
      return;
    }
    console.log('Connesso al database MySQL');

    // Esegui le tue query qui
    const { score, nickname, chiave } = req.body;

    const query = 'INSERT INTO runscores (score, nickname, chiave ) VALUES (?, ?, ?)';

    db.query(query, [score, nickname, 'fdychgvhgf' ], (err, results) => {
      if (err) {
        console.error('Errore durante l\'inserimento del punteggio:', err);
        res.status(500).send('Errore durante il salvataggio del punteggio.');
        return;
      }

      res.status(200).send('Punteggio salvato con successo.');
    });
    // Chiudi la connessione quando hai finito
    connection.end();
  });

/*
// Endpoint per salvare un punteggio
app.post('/salva-punteggio', (req, res) => {
  const { score, nickname, chiave } = req.body;

  const query = 'INSERT INTO runscores (score, nickname, chiave ) VALUES (?, ?, ?)';

  db.query(query, [score, nickname, 'fdychgvhgf' ], (err, results) => {
    if (err) {
      console.error('Errore durante l\'inserimento del punteggio:', err);
      res.status(500).send('Errore durante il salvataggio del punteggio.');
      return;
    }

    res.status(200).send('Punteggio salvato con successo.');
  });
});

// Porta su cui il server ascolta
const PORT = 3306;

// Avvia il server
app.listen(PORT, () => {
  console.log('Server in ascolto sulla porta ${PORT}');
});

*/

