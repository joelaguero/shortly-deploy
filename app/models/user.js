var db = require('../config.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// Create user schema
var userSchema = new db.Schema({
  id: Number,
  username: String,
  password: String,
  timestamps: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  hashPassword();
  next();
});

var hashPassword = function() {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.get('password'), null, null).bind(this)
    .then(function(hash) {
      this.set('password', hash);
    });
};

var comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.plugin(db.autoIncrement.plugin, 'User');
var User = db.connection.model('User', userSchema);

module.exports = User;

