'use strict';

var express = require('express');
var controller = require('./book.controller');

var router = express.Router();

router.get('/:owner', controller.indexByOwner);
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.put('/acceptTrade/:id', controller.acceptTrade);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
