require('dotenv').config();
const getData = require('./src/api/getData');
const {connectToDatabase} = require('./src/lib/database');
const coll = process.env.MONGO_COLLECTION;


//****** Get All Documents
let gets = async () => {
  try {

    console.log('--- Enter to GET function ---');
    let response = getData;

    return response;
  } 
  catch(error) {
    console.log('Error: ' + error);
  }
  
};

//****** Insert One Document
let posts = async function (_email, _ip) {
  try 
  {
      console.log('--- Enter to POST function ----');
      const db = await connectToDatabase();
      const collection = db.collection(coll);
      let doc = {"email": _email, "ip": _ip};
      
      console.log("Info to Insert: "+ doc);
      //console.log("event object: "+ JSON.stringify(event, null, 2));

      // Insert doc
      const item = await collection.insertOne(doc);
      console.log(item);

      let response = {
      statusCode: 200,
      headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Methods": "UPDATE,PUT,POST,GET",
            "Access-Control-Allow-Origin": "*"
        },
      body: doc,
      "isBase64Encoded": false
      };

      return response;
  }
  catch(error) 
  {
    console.log('(handler.js) Error: ' + error);
  }
};

//****** Update One Document
let updateOne = async function (event, context) {
  try 
  {
      const db = await connectToDatabase();
      const collection = db.collection(coll);
      let doc = {"email": event['email'], "ip": event['ip']};
      let id = event['_id'];
      
      console.log("Info to Update: "+ doc);

      // Update doc
      const item = await collection.update('_id:' + id, '$set: ' + doc);
      console.log(item);

      let response = {
      statusCode: 200,
      body: doc
      };

      return response;
  }
  catch(error) 
  {
    console.log('(handler.js) Error: ' + error);
  }
};

//***** Delete One Document
let deleteOne = async function (event, context) {
  try 
  {
      const db = await connectToDatabase();
      const collection = db.collection(coll);
      let doc = {"id": event['id'], "email": event['email']};
      let optional = {"justOne": "true", "writeConcern": {"var1": "", "var2": ""}};
      
      console.log("Info to Delete: "+ doc);

      // Update doc
      const item = await collection.remove(doc);
      console.log(item);

      let response = {
      statusCode: 200,
      body: doc
      };

      return response;
  }
  catch(error) 
  {
    console.log('(handler.js) Error: ' + error);
  }
};

exports.index = async function (event, context)
{
  try
  {
    let http_method = event['httpMethod'];
  
    
    if(http_method == 'GET')
    {
      return gets();
    }
    else if(http_method == 'POST')
    {
      //console.log("event object: "+ JSON.stringify(event, null, 2));
      //console.log("context object: "+ JSON.stringify(context, null, 2));
      return posts(event['email'], event['ip']);
    }
    else if(http_method == 'PUT')
    {
      return updateOne();
    }
    else if(http_method == 'DELETE')
    {
      return deleteOne();
    }
    
  }
  catch(error)
  {
      console.log('(index) switch case statement httpMethod Error: ' + error);
  }

};