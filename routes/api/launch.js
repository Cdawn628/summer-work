/*url:'/api/launch' 
method : 'post',
params:  //前端传给后端的数据
{
    newsTitle:'',
    pubilishAT:'',
    text:'',
    username:'',
    userID:''
}
res://后端返回给前端的值
{
}
*/


let util = require('../util')
let mysql=require('mysql');
const SqlString = require('mysql/lib/protocol/SqlString');

var link = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'wewe3721',
    database:'web_db'
});
link.connect()

function launch(req, res){
    var newsTitle = req.body.newsTitle;
    var publishAt = new Date();
    var text = req.body.text;
    var userID = req.body.userID;
    var username = req.body.username;



    var time = publishAt.toLocaleDateString();

    var sql = `insert into news_admin(authorID, author, newsTitle, publishAt, text) values('${userID}','${username}', '${newsTitle}', '${time}', '${text}')`;

    console.log(newsTitle + text + time);

    if ( newsTitle && text ){
        link.query(sql, function(err,result){
            if(err){
                console.log('[SELECT ERROR]:',err.message);
                }
                else{
                let responseData = { data: {} };
                util.responseClient(res, 200, 1, '发布成功，等待审核', responseData);
                }  
            
        })
    }else{
        let responseData = { data: {} };
        util.responseClient(res, 200, 0, '资讯标题、内容不可为空', responseData);
    }


}


module.exports =launch;