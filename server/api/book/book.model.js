'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  owner: String,
  name: String,
  isbn: String,
  imageUrl: String,
  tradesProposed:[{
    user: String, //user who proposed trade's _id
    book: String // _id of the book offered
  }],
  tradeAccepted: Boolean
  });

module.exports = mongoose.model('Book', BookSchema);
