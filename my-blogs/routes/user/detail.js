const express = require('express');
const route = express.Router();
var db = require('../../model/db');
var Article = db.Article;
var Comment = db.Comment;


route.get('/comment',(req,res)=>{
    var uid = req.session.userId;
    var aid = req.query.aId;
    // console.log(req.query.aId);
    var aTime = req.query.aTime;
    var title = req.query.title;
    var content = req.query.content;
    Comment.create({uid: uid,aId: aid,title: title,content: content});
    res.json({status: 200,msg: '回复成功！'});
});


//显示详情路由
route.get('/:id',(req,res)=>{
    var id = req.params.id;
    var uid = req.session.userId;
    Article.findById(id).then(function(data){
        Comment.find({aId: id}).sort('-commentTime').then(function(cData){
            return res.render('user/detail',{userId: uid,data: data,cData: cData});
        })
    });
});



module.exports = route;