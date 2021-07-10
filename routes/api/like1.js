//import所需工具包以及路径
let util = require('../util')
let mysql= require('mysql')

//链接数据库
var link = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123',
    database:'test1'
});
link.connect()
//改变like状态
function changeLike(req, res){
    var userID=req.query.userID;
    var newsID=req.query.newsID;

    var sqllike1 = 'UPDATE act SET `like`=1-`like` WHERE newsID=?'
    let params = [newsID,userID]

    link.query(sqllike1, params,function(err, result){
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            }
        
        let responseData = { data: {} }
        responseData.data = result;

        if(result.affectedRows > 0)
        {
            util.responseClient(res, 200, 1, '点赞状态改变', responseData);
        }else {
            util.responseClient(res, 200, 0, '内容获取失败', responseData);
        }
        
        
    });
}
module.exports =changeLike;
