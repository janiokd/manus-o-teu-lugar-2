const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/authenticatewithtoken', authenticatewithtoken);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.post('/updateByEmail', updateByEmail);
router.delete('/:id', _delete);
router.post('/deleteByIds', _deleteByIds);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function authenticatewithtoken(req, res, next) {
    userService.authenticatewithtoken(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then((user) => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function updateByEmail(req, res, next) {
    userService.updateByEmail(req.body.email, req.body)
        .then((user) => user ? res.json(user) : res.status(400).json({ message: 'Failed to update an user by email' }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then((user) => res.json(user))
        .catch(err => next(err));
}

function _deleteByIds(req, res, next) {
    userService.deleteByIds(req.body.ids)
        .then((data) => res.json(data))
        .catch(err => next(err));
}