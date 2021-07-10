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
function changeLike(req, res1)
{
    var userID=req.query.userID;
    var newsID=req.query.newsID;
    let params=[newsID,userID]
    var state=req.query.state
    var sqllike1 ='UPDATE act SET `like`=1-`like` WHERE newsID=? AND userID=?'
    var sqllike2=''
    var results=0;

    if(state==1){
        sqllike2 = `UPDATE news SET likeCount =likeCount +1 WHERE newsID ='${newsID}'`
   }
   else if(state==0){
        sqllike2 = `UPDATE news SET likeCount =likeCount -1 WHERE newsID ='${newsID}'`
   }
   else return

    function test () 
    {
        return new Promise(function (resolve) 
    {
        link.query(sqllike1,params,function(err, result1)
        {
            if(err)
            {
                console.log(`[UPDATE ERROR] - ${err.message}`)
            }
            console.log(result1)
            if(result1.affectedRows>0){results+=1;console.log("l1:"+results)}
            resolve(results)
        })
    })}

    test().then(function(res)
    {
        link.query(sqllike2,function(err, result2)
    {
        if(err)
        {
            console.log('[UPDATE ERROR]:',err.message);
        }       
        console.log(result2)
        if(result2.affectedRows>0){results=res+1;console.log("l2:"+results);}

    })
        return results+1
    }).then(function(res){
        let responseData={data:{}};
        console.log("f:"+res);
        if(res==2){
            util.responseClient(res1, 200, 1, '点赞成功', responseData);
        }else {
            util.responseClient(res1, 200, 0, '点赞失败', responseData);
        }
    })
    .catch(function (err) {
        console.log("err:"+err);})

}
module.exports =changeLike