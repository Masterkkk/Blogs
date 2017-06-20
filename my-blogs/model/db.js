const db = require('mongoose');
db.Promise = global.Promise;
db.connect('mongodb://localhost/blogs/');

//创建用户数据集合
var userSchemas = db.Schema({
    userName: String,
    userPwd: String,
    name: String,
    gender: String,
    phone: String,
    email: String
});
var User = db.model('User',userSchemas);

//创建文章数据集合
var articleSchemas = db.Schema({
    title: String,
    content: String,
    select: String,
    postTime: {
        type: Date,
        default: Date.now
    },
    comment: Array
});

articleSchemas.methods.getDate = function(){
    var year = this.postTime.getFullYear();
    var month = this.postTime.getMonth() + 1;
    var date = this.postTime.getDate();
    var hour = this.postTime.getHours();
    var min = this.postTime.getMinutes();
    return(year + '-' + month + '-' + date + '-' + hour + ':' + min);
}

articleSchemas.methods.getTime = function(){
    return this.postTime.getTime();
}

var Article = db.model('Article',articleSchemas);


//创建回复数据集合
var commentSchemas = db.Schema({
    uid: String,
    aId:String,
    title: String,
    content: String,
    commentTime: {
        type: Date,
        default: Date.now()
    }
});

commentSchemas.methods.getDate = function(){
    var year = this.commentTime.getFullYear();
    var month = this.commentTime.getMonth() + 1;
    var date = this.commentTime.getDate();
    var hour = this.commentTime.getHours();
    var min = this.commentTime.getMinutes();
    return(year + '-' + month + '-' + date + '-' + hour + ':' + min);
}

var Comment = db.model('Comment',commentSchemas);

module.exports = {
    User: User,
    Article: Article,
    Comment: Comment
}