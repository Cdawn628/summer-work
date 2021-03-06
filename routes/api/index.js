var express = require('express')
var handlebars = require("express3-handlebars").create({ defaultLayout: "main"});
module.exports = function(app){

  
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

  app.engine("handlebars", handlebars.engine); //设置视图引擎
  app.set("view engine", "handlebars");

    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    
    app.get('/',function(req,res){
      res.send('hello world')
    })

    
    //注册界面
    //app.post('/api/register',require('./register'))
   
    //登陆界面
    app.post('/api/login',require('./login'))
  
    //管理员列表
    app.get('/api/list_admin',require('./list_admin'))
  
    //管理员删除
    app.post('/api/ad_dele',require('./admin/deleNews'))

    //管理员查看
    app.post('/api/ad_check',require('./admin/checkNews'))

  //管理员审核通过
    app.post('/api/pass',require('./admin/pass'))
  
  //管理员审核不通过
  app.post('/api/nopass',require('./admin/nopass'))
  
    app.get('/api/list_Rec',require('./list_Rec'))
    app.get('/api/list_Hot',require('./list_Hot'))
    app.get('/api/list_Sub',require('./list_Sub'))
  
     //文章发布
     app.post('/api/launch',require('./launch'))

  
     //文章详情，点赞，收藏
  app.get('/api/detail',require('./detail'))
  app.get('/api/like1',require('./like1'))
  app.get('/api/subscribe',require('./subscribe'))
  app.get('/api/read',require('./read'))

    // 测试路由
    //app.get('/api/test',function(req, res){
   //   res.render("thank-you")
    //  })
}
