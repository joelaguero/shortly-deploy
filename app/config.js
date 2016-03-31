var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection('mongodb://localhost:27017', function(err) {
  if (err) { console.log(err); }
  console.log('Connected to MongoDB database');
});

autoIncrement.initialize(connection);

var urlSchema = new Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { type: Date, default: Date.now }
}); 

// Create user schema
var userSchema = new Schema({
  id: Number,
  userName: String,
  password: String,
  timestamps: { type: Date, default: Date.now }
});

userSchema.plugin(autoIncrement.plugin, 'User');
urlSchema.plugin(autoIncrement.plugin, 'Link');

var User = connection.model('User', userSchema);
var Link = connection.model('Link', urlSchema);
 
module.exports = {
  User: User,
  Link: Link
};