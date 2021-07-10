const mysql=require('mysql')
let util = require('../util')
//创建数据库连接对象
const connection =mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123',
    database:'test1'

})
//链接数据库
connection.connect()
//console.log("链接成功");

function subscribe(req,res)
{

    var newsID=req.query.newsID;
    var userID=req.query.userID;
//sub功能2：改变sub状态
let sqlsub2 = 'UPDATE act SET `sub`=1-`sub` WHERE newsID= ? and userID = ?'
let params = [newsID,userID]
connection.query(sqlsub2,params,function(err,result){
    if(err){
        console.log(`[UPDATE ERROR] - ${err.message}`)
    }

    let responseData = { data: {} }

    responseData.data = result;

        if(result.affectedRows > 0)
        {
            util.responseClient(res, 200, 1, '收藏状态改变', responseData);
        }else {
            util.responseClient(res, 200, 0, '内容获取失败', responseData);
        }
})
}
//将sub暴露出去
module.exports =subscribe