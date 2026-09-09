const express = require('express');
const { getKeywords, addKeyword, deleteKeyword } = require('../controllers/keyword-controller');

const router = express.Router();

router.get('/', getKeywords);
router.post('/', addKeyword);
router.delete('/:id', deleteKeyword);

module.exports = router;