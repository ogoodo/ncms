
//blog  https://github.com/jackhutu/jackblog-api-koa/blob/master/server/api/comment/index.js

//参考:  https://github.com/Tonyce/Fuck-Experience-API/blob/master/api.js
//参考: https://github.com/koajs/koa/blob/v2.x/docs/guide.md
// https://github.com/ckken/KNode/blob/v2/framework/core/express.js
// http://n.thepana.com/2015/11/25/koa2-0/
//支持koa 2.x 中间件 https://github.com/wistityhq/strapi/issues/41
//co index.js 70行加上  return null; 能解决koa-static的一个警告

启动mongodb命令(windows下)
D:\njs\mongodb\mongod.exe --dbpath=d:\njs\mgdb\data

启动服务器
node index.js

访问地址
http://115.28.179.190:3000/articles

支持koa2 的项目 
https://github.com/rkusa/koa-passport/tree/v2.x


没测试的项目不知道是否支持koa2
https://github.com/Chilledheart/koa-session-redis


