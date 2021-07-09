/*url:'/api/explore_Sub' //关注界面（推送用户关注的文章）
method : 'get',
params:  //前端传给后端的数据
{
    userID:''
}
res://后端返回给前端的值
{
    newsID:'',
    newsTitle:'',
    publishAt:''
}
*/

//import所需工具包以及路径
let util = require('../util')
let mysql=require('mysql')

//链接数据库
var link = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'wewe3721',
    database:'web_db',
    multipleStatements:true
});
link.connect()

function Sub(req, res){

    var userID = req.query.userID;
    
   // var sql_0 = `select newsID, newsTitle, publishTime from news where newsID='${newsid}'`
    var sql_1 = `select newsID from act where userID = '${userID}' and sub = 1`


    link.query(sql_1, function(err, result1){
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            }
        
        console.log("1" + result1.length);
        //console.log(result1[0].newsID);

        let responseData1 = { data: {} };

        responseData1.data = result1;

        let length1 = result1.length;

        

        if(length1 > 0){
            
            
            for(let i = 0; i < length1; i++){
                
                var sql_0 = `select newsID, newsTitle, publishTime from news where newsID='${result1[i].newsID}'`
                link.query(sql_0, function(err, result0){

                    
                    if(err){
                        console.log('[SELECT ERROR]:',err.message);
                        }
                    console.log("0" + result0.length);
    
                    let responseData2 = { data:{} };
                    responseData2.data = result0;
                    let length0 = result0.length;
    
                    if(length0 > 0){
                        util.responseClient(res, 200, 1, '', responseData2);
                    }else {
                        util.responseClient(res, 200, 0, '您还未关注任何文章', responseData2);
                    }
    
                });

            }
            
        }else {
            util.responseClient(res, 200, 0, '内容获取失败', responseData1);
        }
        
    });
}

module.exports = Sub;