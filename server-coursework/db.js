const { MongoClient } = require('mongodb');

// const connectUrl = 'mongodb+srv://yanaibabak:@cluster0.jcntvne.mongodb.net/';
let db;

module.exports = {
  connectToDb: (callback) => {
    MongoClient.connect(connectUrl).then((client) => {
      console.log('Connection successful!');
      db = client.db();
      return callback();
    }).catch(error => {
      return callback(error);
    })
  },
  getDb: () => db
}