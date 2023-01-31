const express = require('express');
const router = express.Router();
const {newArticle, createArticle, articleWithID, editArticle, editedArticle} = require('../controllers/controller');

router.get('/new', newArticle);

router.post('/' , createArticle);

router.get('/:id', articleWithID)

router.get('/edit/:id', editArticle);

router.post('/edited', editedArticle);

module.exports = router;