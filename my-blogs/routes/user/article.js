const express = require('express');
const route = express.Router();
const db = require('../../model/db');
var Article = db.Article;

//发表文章
route.get('/',(req,res)=>{
    var uid = req.session.userId;
    res.render('user/article',{userId: uid});
});
route.post('/',(req,res)=>{
    var title = req.body.title;
    var content = req.body.content;
    var select = req.body.select;
    // console.log(req.body);
    Article.create({title:title,content:content,select:select});
    res.json({msg: '发表成功'});
});



//评论

module.exports = route;