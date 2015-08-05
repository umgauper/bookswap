'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  owner: String,
  name: String,
  isbn: String,
  imageUrl: String
  });

module.exports = mongoose.model('Book', BookSchema);
