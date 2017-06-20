const express = require('express');
const route = express.Router();
const db = require('../../model/db');
var Article = db.Article;


route.get('/',(req,res)=>{
    var uid = req.session.userId;
    Article.find({}).sort('-postTime').then(function(data){
        res.render('user/home',{userId: uid,data: data});
    });
});

route.get('/:name?',(req,res)=>{
    var name = req.params.name;
    console.log(name);
    var uid = req.session.userId;
    if(name == null|| name == '全部'){
        Article.find({}).sort('-postTime').then(function(data){
            res.render('user/aaa',{userId: uid,data: data});
        });
    }
    else{
        Article.find({select: name}).sort('-postTime').then(function(data){
            // console.log(data);
            res.render('user/aaa',{data: data});
        });
    }
    
});

module.exports = route;