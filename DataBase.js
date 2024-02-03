async function ottieniDati() {
  const response = await fetch('http://localhost:3000/api/dati');
  const dati = await response.json();

  const elencoDati = document.getElementById('elencoDati');
  elencoDati.innerHTML = '';

  dati.forEach((dato) => {
    const listItem = document.createElement('li');
    listItem.textContent = `score: ${dato.score}, nickname: ${dato.username}`;
    elencoDati.appendChild(listItem);
  });
}

// Funzione per aggiungere nuovi dati al server
async function aggiungiDati() {
  const score = document.getElementById('score').value;
  const nickname = document.getElementById('username').value;
  const chiave = 'shbey'

  await fetch('http://localhost:3000/api/dati', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score, nickname , chiave}),
  });

  // Dopo aver aggiunto i dati, ottieni e visualizza l'elenco aggiornato
  ottieniDati();
}

// Chiamare la funzione per ottenere e visualizzare i dati all'avvio dell'app
ottieniDati();

/*async function inviaDati() {
  const dato1 = 'valore1';
  const dato2 = 'valore2';

  try {
    const response = await fetch('http://localhost:3000', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dato1, dato2 }),
    });

    const result = await response.json();
    console.log('Risultato dell\'invio:', result);
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
  }
}

async function ottieniDati() {
  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    console.log('Dati ottenuti:', data);
  } catch (error) {
    console.error('Errore durante la richiesta:', error);
  }
}



/*async function ottieniDati() {
    try {
      const response = await fetch('C:\ProgramData\MySQL\MySQL Server 8.0\data');
      const data = await response.json();
      console.log('Dati ottenuti:', data);
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  }

  async function inviaDati() {
    const dato1 = 'valore1';
    const dato2 = 'valore2';
    const score= 125;

    try {
      const response = await fetch('C:\ProgramData\MySQL\MySQL Server 8.0\data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dato1, dato2, score }),
      });

      const result = await response.json();
      console.log('Risultato dell\'invio:', result);
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  }*/