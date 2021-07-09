let util = require('../util')
let mysql=require('mysql')

//链接数据库
var link = mysql.createConnection({      //创建mysql实例
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'123456',
    database:'test',
    multipleStatements:true
});
link.connect()


//构建登陆函数  必须 因为post需要返回res
function register(req, res){

    //获取前端的username和password
    //注意 post方法用req.body   Get 用 req.query
    var user=req.body.username;
    var pwd=req.body.password;

    //数据库操作语句  如果引用变量 要用${},切记如果变量不是int，必须加''
    var sql1=`select * from users  where username = '${user}'`
    //var str={}
    //数据库执行语句 sql
    link.query(sql1,function(err,result)
    { 
        if(err){
        console.log('[SELECT ERROR]:',err.message);
        }
        //str = JSON.stringify(result)


       //console.log(result);

       //必须要有 用于前端数据的输出 data可以赋值 由于这里不需要返回 所以只初始化
        let responseData = { data: {} }

        
        
      
        if(result[0]&&result[0].username == user)
        util.responseClient(res, 200, 0, '用户名已存在', responseData);
        else
        {
            var sql2=`insert into users(username,password) values('${user}','${pwd}')`
            link.query(sql2,function(err,result1)
            { 
                if(err){
                console.log('[SELECT ERROR]:',err.message);
                }
                else{
                let responseData = { data: {} }
                util.responseClient(res, 200, 1, '注册成功', responseData)
                }  
            })
        }
         
        
    })

    
       
   

}

//将login暴露出去
module.exports =register
