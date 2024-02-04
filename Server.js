import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors());

// Configura la connessione al database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'server',
  password: 'Blockchain2024!',
  database: 'LuffyRunScore',
});

// Connessione al database
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err);
    return;
  }
  console.log('Connesso al database MySQL');
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

app.post('/api/dati', (req, res) => {
  const { score, username, chiave } = req.body;

  // Utilizza i segnaposto nella query per evitare SQL injection
  const query = 'INSERT INTO runscores (score, nickname, chiave) VALUES (?, ?, ?)';

  const values = [score, username, chiave];

  connection.query(query, values, (err, results, fields) => {
    if (err) {
      console.error('Errore durante l\'esecuzione della query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json({ success: true });
  });
});

// Avvia il server
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

