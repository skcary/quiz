const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
const db = mongoose.connect(config.mongodb, { useMongoClient: true });
db.then(() => console.info('Database connect established'))
  .catch(console.error.bind(console, 'connection error:'));
