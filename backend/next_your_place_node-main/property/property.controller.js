const express = require('express');
const router = express.Router();
const propertyService = require('./property.service');

// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/get', get);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/deleteByIds', _deleteByIds);
router.post('/deleteAll', deleteAll);

module.exports = router;

function register(req, res, next) {
    propertyService.create(req.body)
        .then((property) => res.json(property))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    propertyService.getAll()
        .then(propertys => res.json(propertys))
        .catch(err => next(err));
}

function get(req, res, next) {
    propertyService.get(req.query)
        .then(propertys => res.json(propertys))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    propertyService.getById(req.property.sub)
        .then(property => property ? res.json(property) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    propertyService.getById(req.params.id)
        .then(property => property ? res.json(property) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    propertyService.update(req.params.id, req.body)
        .then((property) => res.json(property))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    propertyService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _deleteByIds(req, res, next) {
    propertyService.deleteByIds(req.body.ids)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteAll(req, res, next) {
    propertyService.deleteAll()
        .then(() => res.json({}))
        .catch(err => next(err));
}