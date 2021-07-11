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

function nopass(req, res){



var newsid=req.body.newsid;


var sql=`delete from news_admin where newsid = '${newsid}'`;
link.query(sql,function(err,result)
{ 
    if(err){
    console.log('[delete ERROR]:',err.message);
    }
    //str = JSON.stringify(result)


  console.log(result.affectedRows);

        let responseData = { data: {} } 
       // responseData.data=result2[0];
        if(result.affectedRows>0)
         util.responseClient(res, 200, 1, '成功', responseData)
        else 
          util.responseClient(res, 200, 0, '文章不存在', responseData)
   })
     




}

module.exports = nopass












