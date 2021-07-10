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

function addRead(req, res){
    var newsID=req.query.newsID
    
    let sqlread = `UPDATE news SET readCount =readCount +1 WHERE newsID ='${newsID}'`
    
    link.query(sqlread,function(err, result){
        if(err)
        {
            console.log(`[UPDATE ERROR] - ${err.message}`)
        }


        let responseData = { data: {} }
        console.log(result)
        responseData.data = result;

        if(result.affectedRows > 0)
        {
            util.responseClient(res, 200, 1, '文章阅读量增加', responseData);
        }else {
            util.responseClient(res, 200, 0, '内容获取失败', responseData);
        }
    });
}
module.exports =addRead;