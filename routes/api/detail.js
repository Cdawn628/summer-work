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
console.log("链接成功");

function textDetail(req,res)
{

    var newsID=req.query.newsID;
    
//显示文章详情
let sql = `SELECT * FROM news WHERE newsID = '${newsID}'`
connection.query(sql,function(err,result){
    if(err){
        console.log(`[SELECT ERROR] - ${err.message}`)
    }
    console.log(result);
    let responseData = { data: {} }
    responseData.data = result;

    if(result)
    {
        util.responseClient(res, 200, 1, '文章详情获取成功', responseData);
    }else {
        util.responseClient(res, 200, 0, '内容获取失败', responseData);
    }
})
}
//将login暴露出去
module.exports =textDetail