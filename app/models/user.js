var db = require('../config.js');

// Create user schema
var userSchema = new db.Schema({
  id: Number,
  userName: String,
  password: String,
  timestamps: { type: Date, default: Date.now }
});

userSchema.plugin(db.autoIncrement.plugin, 'User');
var User = db.connection.model('User', userSchema);

module.exports = User;

// Old version of user.js

// var db = require('../config');
// var bcrypt = require('bcrypt-nodejs');
// var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
