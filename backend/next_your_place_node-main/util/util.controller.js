const express = require("express");
const router = express.Router();
const utilService = require("./util.service");

// routes
router.get("/getNeighborhoods", getNeighborhoods);
router.get("/fetchCep", fetchCep);

module.exports = router;


function fetchCep(req, res, next) {
  utilService
    .fetchCep(req.query)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function getNeighborhoods(req, res, next) {
  utilService
    .getNeighborhoods(req.query)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
