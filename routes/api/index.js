var express = require('express')
var handlebars = require("express3-handlebars").create({ defaultLayout: "main"});
module.exports = function(app){

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
    app.get('/api/Rec',require('./Rec'))
    app.post('/api/Hot',require('./Hot'))
    app.post('/api/Sub',require('./Sub'))

   

    // 测试路由
    //app.get('/api/test',function(req, res){
   //   res.render("thank-you")
    //  })
}
