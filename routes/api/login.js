/*url:'/api/login' //登录界面
method : 'post',
params://前端传给后端的数据
{
    username:'',
    password:''
}
res://后端返回给前端的值
{
    code:''//0为失败，1为成功
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
    password:'123456',
    database:'test'
});
link.connect()


//构建登陆函数  必须 因为post需要返回res
function login(req, res){

    //获取前端的username和password
    //注意 post方法用req.body   Get 用 req.query
    var user=req.body.username;
    var pwd=req.body.password;

    //数据库操作语句  如果引用变量 要用${},切记如果变量不是int，必须加''
    var sql=`select * from users where username = '${user}'`
    //var str={}
    //数据库执行语句 sql
    link.query(sql,function(err,result)
    { 
        if(err){
        console.log('[SELECT ERROR]:',err.message);
        }
        //str = JSON.stringify(result)


       console.log(result[0].username);

       //必须要有 用于前端数据的输出 data可以赋值 由于这里不需要返回 所以只初始化
        let responseData = { data: {} }

        if(!result[0])
        {
            //res是返回结果不需要管  200是http状态码 0就是code 
        util.responseClient(res, 200, 0, '无效用户名，请先注册', responseData)
        return;
        }
        if(result[0].password == pwd && result[0].username == user ){
            util.responseClient(res, 200, 1, '登陆成功', responseData)
        }
        else{
            util.responseClient(res, 200, 2, '用户名或密码错误', responseData)
        }
        
    })
        
       
   

}

//将login暴露出去
module.exports =login 
