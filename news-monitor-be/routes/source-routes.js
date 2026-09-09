const express = require('express');
const router = express.Router();

const {
    getSources, 
    addSource, 
    deleteSource 
} = require('../controllers/source-controller');

router.get('/', getSources);
router.post('/', addSource);
router.delete('/:id', deleteSource);

module.exports = router;