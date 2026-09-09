const express = require('express');
const { getNewsArticles } = require('../controllers/news-controller')

const router = express.Router();

router.get('/', getNewsArticles);

module.exports = router;