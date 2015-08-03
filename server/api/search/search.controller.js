'use strict';

var _ = require('lodash');
var Search = require('./search.model');
var request = require('request');
var config = require('../../config/local.env.js');
// Get list of searchs
exports.index = function(req, res) {

  var query = 'https://www.googleapis.com/books/v1/volumes?q=';
  var key = config.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY;
  console.log(req.body);
  query = query + req.params.newBook;// + '?k=' + key;

  request(query, function(error, response, body) {
        if(error) {
          console.log(error);
        } else {
          console.log(response);
          res.send(200, response); //where is the information for the book image. have to put in db. ok ok ok ok
        }
    });
};

// Get a single search
exports.show = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    return res.json(search);
  });
};

// Creates a new search in the DB.
exports.create = function(req, res) {
  Search.create(req.body, function(err, search) {
    if(err) { return handleError(res, err); }
    return res.json(201, search);
  });
};

// Updates an existing search in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Search.findById(req.params.id, function (err, search) {
    if (err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    var updated = _.merge(search, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, search);
    });
  });
};

// Deletes a search from the DB.
exports.destroy = function(req, res) {
  Search.findById(req.params.id, function (err, search) {
    if(err) { return handleError(res, err); }
    if(!search) { return res.send(404); }
    search.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
