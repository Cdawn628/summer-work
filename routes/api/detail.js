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

function textDetail(req, res1)
{
    var userID=req.query.userID;
    var newsID=req.query.newsID;
    var results=0
    let sql1 = `SELECT * FROM news WHERE newsID = '${newsID}'`
    let sql2 = `SELECT * FROM act WHERE userID = '${userID}'`
    var responseData = {news: {} ,act:{}};
    function test () 
    {
        return new Promise(function (resolve) 
    {
            connection.query(sql1,function(err,result1)
            {
                if(err)
                {
                    console.log(`[SELECT1 ERROR] - ${err.message}`)
                }
                responseData.news = result1;
                console.log("r1:",result1);
                resolve(responseData.news)
            })
    })}

    test().then(function(res)
    {
        connection.query(sql2,function(err,result2)
        {
        if(err)
        {
            console.log(`[SELECT2 ERROR] - ${err.message}`)
        }
        console.log(res);
        responseData.news=res
        responseData.act = result2;
        console.log(responseData);
        if(responseData){
        util.responseClient(res1, 200, 1, '内容和获取成功', responseData);
        }else {
        util.responseClient(res1, 200, 0, '内容和状态获取失败', responseData);
        }
    })
    .catch(function (err) {
        console.log("err:"+err);})
})
}

module.exports =textDetail
