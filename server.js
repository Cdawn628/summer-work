var express=require('express')
var routers = require('./routes/api')
const app = new express()


routers(app)




app.listen(3000, function (err) {
    if (err) {
        console.error('err:', err);
    } else {
        console.info(`===> api server is running at 127.0.0.1`)
    }
});

