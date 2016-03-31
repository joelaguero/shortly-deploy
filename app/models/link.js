var db = require('../config.js');
var crypto = require('crypto');

// Create url schema
var urlSchema = new db.Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { type: Date, default: Date.now }
}); 

urlSchema.pre('save', function(next) {
  shortenUrl();
});

var shortenUrl = function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.get('url'));
  this.set('code', shasum.digest('hex').slice(0, 5));  
};

urlSchema.plugin(db.autoIncrement.plugin, 'Link');
var Link = db.connection.model('Link', urlSchema);

module.exports = Link;
 

