const express = require("express");
const router = express.Router();
const {showAllArticles, deleteArticle} = require('../controllers/controller');


router.get('/', showAllArticles);

router.get('/delete/:id', deleteArticle);
module.exports = router;