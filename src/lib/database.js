'use strict';
require('dotenv').config();
const mongo = require('mongodb');
const { MongoClient } = mongo;
let cachedDb = null;
const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DBNAME;

let connectToDatabase = async() => {
  if(cachedDb){
    console.log("Usa la conexión existente");
    return Promise.resolve(cachedDb);
  }
  else{
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log("Nueva conexión de Base de Datos");
    cachedDb = client.db(dbName);
    
    return cachedDb;
  }
};

module.exports = {

  connectToDatabase,
};