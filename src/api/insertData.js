require('dotenv').config();
const {connectToDatabase} = require('../lib/database');
const coll = process.env.MONGO_COLLECTION;

let insertData = async (info) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(coll);
        const doc = JSON.stringify(info);

        // Query for an item that has the item 'pencil'
        //const query = { item: 'pencil' };
        const item = await collection.insertOne(doc);
        console.log(item);

        let response = {
        statusCode: 200,
        body: JSON.stringify(item)
        };

        return response;
  } 
  catch(error) {
    console.log('Error: ' + error);
  }
}

module.exports = insertData();