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

function pass(req, res){



var newsid=req.body.newsid;


var sql=`update news_admin set flag = 1 where newsid = '${newsid}'`;
link.query(sql,function(err,result)
{ 
    if(err){
    console.log('[update ERROR]:',err.message);
    }
    //str = JSON.stringify(result)


   //console.log(result);
var sql1=`select * from news_admin where newsid='${newsid}'`;
   //必须要有 用于前端数据的输出 data可以赋值 由于这里不需要返回 所以只初始化
   link.query(sql1,function(err1,result1)
   {
    // console.log(result);
    if(err1){
        console.log('[update ERROR]:',err1.message);
        }
        console.log(result1);
        let newsTitle=result1[0].newsTitle;
        let text=result1[0].text;
        let author=result1[0].author;
        let authorID=result1[0].authorID;
        let readCount=result1[0].readCount;
        let likeCount=result1[0].likeCount;
        let publishAt=result1[0].publishAt;   



        var sql2=`insert into news(newsTitle,text,author,authorID,publishAt) values('${newsTitle}','${text}','${author}',${authorID},'${publishAt}')`;
        link.query(sql2,function(err2,result2)
        { 
            if(err2){
            console.log('[update ERROR]:',err2.message);
            }
        let responseData = { data: {} } 
       // responseData.data=result2[0];
        if(result2)
         util.responseClient(res, 200, 1, '成功', responseData)
        else 
          util.responseClient(res, 200, 0, '文章不存在', responseData)
   })
     
})
})


}

module.exports = pass












