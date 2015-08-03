'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  owner: String,
  name: String,
  isbn: Number,
  imageUrl: String
  });

module.exports = mongoose.model('Book', BookSchema);
