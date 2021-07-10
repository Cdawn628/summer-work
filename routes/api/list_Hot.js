/*url:'/api/explore_Hot' //推荐界面（推送所有文章）
method : 'get',
params:  //前端传给后端的数据
{
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
let mysql= require('mysql')

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

function Hot(req, res){
    
    var sql = 'select newsID, newsTitle, publishTime from news order by (readCount+likeCount) desc limit 10'

    link.query(sql, function(err, result){
        if(err){
            console.log('[SELECT ERROR]:',err.message);
            }
        
        console.log(result.length);
        let news_num = result.length; 

        let responseData = { data: {} }

        responseData.data = result;

            if(news_num > 0){
                util.responseClient(res, 200, 1, '', responseData);
            }else {
                util.responseClient(res, 200, 0, '内容获取失败', responseData);
            }
        
        
    });
}

module.exports =Hot;