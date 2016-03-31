var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var connection = mongoose.createConnection('mongodb://localhost:27017', function(err) {
  if (err) { console.log(err); }
  console.log('Connected to MongoDB database');
});

var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

module.exports = {
  connection: connection,
  autoIncrement: autoIncrement,
  Schema: Schema
};