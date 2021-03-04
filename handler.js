
/*const awsServerlessExpress = require('aws-serverless-express');
const app = require('./src/index');

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context);
}
*/
const getData = require('./src/api/getData');


let gets = async () => {
  try {

    let response = getData;

    return response;
  } 
  catch(error) {
    console.log('Error: ' + error);
  }
  
};

module.exports = {
  gets,
};
