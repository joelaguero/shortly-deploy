var mongoose = require('mongoose');
var db = require('../config.js');
var crypto = require('crypto');

// Create url schema
var urlSchema = new mongoose.Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { type: Date, default: Date.now }
}); 

urlSchema.pre('save', function(next) {
  shortenUrl(this);
  next();
});

var shortenUrl = function(model) {
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  this.code = shasum.digest('hex').slice(0, 5);
};

urlSchema.plugin(db.autoIncrement.plugin, 'Link');
var Link = mongoose.model('Link', urlSchema);

module.exports = Link;
