'use strict';

var _ = require('lodash');
var Book = require('./book.model');

// Get list of books
exports.indexByOwner = function(req, res) {
  var owner = req.params.owner;
  Book.find({owner: owner}, function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};

exports.index = function(req, res) {
  Book.find(function (err, books) {
    if(err) { return handleError(res, err); }
    return res.json(200, books);
  });
};

// Get a single book
exports.show = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.json(book);
  });
};

// Creates a new book in the DB.
exports.create = function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) { return handleError(res, err); }
    return res.json(201, book);
  });
};

// Updates an existing book in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id;}
  var query = {_id: req.params.id};
  var user = req.body.user;
  var book = req.body.book;
  var update = {$push: {"tradesProposed": {user: user, book: book}}};
  Book.update(query, update, function (err, book) {
    if (err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    return res.send(200);
  });
};

// Deletes a book from the DB.
exports.destroy = function(req, res) {
  Book.findById(req.params.id, function (err, book) {
    if(err) { return handleError(res, err); }
    if(!book) { return res.send(404); }
    book.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
