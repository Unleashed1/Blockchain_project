async function ottieniDati() {
    try {
      const response = await fetch('/api/dati');
      const data = await response.json();
      console.log('Dati ottenuti:', data);
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  }

  async function inviaDati() {
    const dato1 = 'valore1';
    const dato2 = 'valore2';

    try {
      const response = await fetch('/api/dati', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dato1, dato2 }),
      });

      const result = await response.json();
      console.log('Risultato dell\'invio:', result);
    } catch (error) {
      console.error('Errore durante la richiesta:', error);
    }
  }