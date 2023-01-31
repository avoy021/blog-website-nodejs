const Article = require('../models/articles');

const showAllArticles = async (req,res) => {
    const article = await Article.find().lean();
    res.render('home',{ article})
};

const newArticle = (req,res) => {
    res.render('newArticles');
};

const createArticle = async (req,res) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    const newArticle = {
        title : req.body.title,
        description : req.body.description,
        markdown : req.body.markdown,
        createdAt : currentDate,
    }
    try {
        const newData = await Article.create(newArticle);
        if(newData){
            res.redirect(`/articles/${newData.id}`);
        }
    } catch (err) {
        res.render('newArticles',{newData});
    }
}

const articleWithID = async (req,res) => {
    const findArticle = await Article.findById(req.params.id).lean();
    if(findArticle.title){
        res.render('showArticle',{findArticle});
    }
    else{
        res.redirect('/');
    }
}

const editArticle = async (req,res) => {
    const article = await Article.findById(req.params.id).lean();
    res.render('editArticle',{article});
}

const editedArticle = async (req,res) => {
    const article = await Article.findById(req.body.id);
    const newArticle = {
        title : req.body.title || article.title,
        description : req.body.description || article.description,
        markdown : req.body.markdown || article.markdown,
    }
    await Article.findByIdAndUpdate(req.body.id,newArticle);
    res.redirect(`/articles/${req.body.id}`);
}

const deleteArticle = async (req,res,id) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect('/');
}

module.exports = {
    newArticle,
    createArticle,
    articleWithID,
    showAllArticles,
    deleteArticle,
    editArticle,
    editedArticle
}