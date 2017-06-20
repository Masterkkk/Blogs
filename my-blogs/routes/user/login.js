const express = require('express');
const route = express.Router();
const db = require('../../model/db');
var User = db.User;

//注册处理
route.post('/register',(req,res)=>{
    var user_info = req.body;
    delete user_info.userRePwd;
    User.findOne({userName: user_info.userName}).then(function(data){
        if(data){
            res.json({status: 400,msg: '账号已存在...'});
        }else{
            User.create(user_info).then(function(data2){
                res.json({status: 200,msg: '注册成功！'});
            }).catch(function(err2){
                res.json({status: 400,msg: '注册失败...'});
            });
        }
    }).catch(function(err){
        res.json({status: 400,msg: '注册失败...'});
    });
});

//登录路由
route.post('/login',(req,res)=>{
    var user_info = req.body;
    User.findOne({userName: user_info.userName,userPwd: user_info.userPwd}).then(function(data){
        if(data){
            req.session.userId = data.id;
            console.log(req.session.userId);
            res.json({status: 200,msg: '登录成功'});
        }else{
            res.json({status: 400,msg: '登录失败，检查账号密码是否正确...'});
        }
    }).catch(function(err){
        res.json({status: 400,msg: '登录失败...'});
    });
});

//退出登录
route.get('/logout',(req,res)=>{
    req.session.userId = null;
    res.redirect('/');
});

module.exports = route;