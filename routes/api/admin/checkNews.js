let util = require('../../util')
let mysql=require('mysql')


var link = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456',
    database:'test'
});
link.connect()

function checkNews(req, res){



var newsid=req.body.newsID;
var sql=`select * from news where newsID = '${newsid}'`;

link.query(sql,function(err,result)
{ 
    if(err){
    console.log('[Select ERROR]:',err.message);
    }
    //str = JSON.stringify(result)


   //console.log(result);

   //必须要有 用于前端数据的输出 data可以赋值 由于这里不需要返回 所以只初始化
   
    // console.log(result);
            let responseData = { text: {} } 
            responseData.text=result[0].text;
            if(result[0])
             util.responseClient(res, 200, 1, '成功', responseData)
            else 
              util.responseClient(res, 200, 0, '文章不存在', responseData)

    
     
    
})


}

module.exports = checkNews


