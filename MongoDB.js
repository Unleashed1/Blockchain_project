/*export let db;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://danmasmac:Blockchain2024@blockchainproject.grlbkxf.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function run() {
  //try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    db = client.db("LuffyRunScore");
    await db.command({ping : 1});
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //} finally {
    // Ensures that the client will close when you finish/error
  /*  await client.close();
  }
}

export async function stop(){
  await client.close();
}

run().catch(console.dir);*/

import { MongoClient } from 'mongodb';

let db;
const uri = "mongodb+srv://danmasmac:Blockchain2024@blockchainproject.grlbkxf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function run() {
  try {
    await client.connect();
    console.log('Connesso a MongoDB');
    db = client.db("LuffyRunScore");
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Errore durante la connessione a MongoDB:', error);
  }
}

export async function stop() {
  await client.close();
  console.log('Connessione a MongoDB chiusa');
}

export async function inserisciPunteggio(giocatore, punteggio) {
  try {
    if (!db) {
      console.error('Errore: Connessione a MongoDB non stabilita.');
      return;
    }

    const scoresCollection = db.collection('scores');
    const punteggioDaInserire = { giocatore, punteggio };
    const result = await scoresCollection.insertOne(punteggioDaInserire);
    console.log('Punteggio inserito con successo. ID: ${result.insertedId}');
  } catch (error) {
    console.error('Errore durante l\'inserimento del punteggio:', error);
  }
}
