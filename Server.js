
//const express = require('express');
const mysql = require('mysql2');
//const app = express();
//const cors = require('cors');

//app.use(cors({ credentials: true }));

function database(){
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
}
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

