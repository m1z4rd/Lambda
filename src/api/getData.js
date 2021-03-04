require('dotenv').config();
const {connectToDatabase} = require('../lib/database');
const coll = process.env.MONGO_COLLECTION;

let getData = async () => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection(coll);

        // Query for an item that has the item 'pencil'
        //const query = { item: 'pencil' };
        const item = await collection.find({}).toArray();
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

module.exports = getData();