'use strict';
const Router = require('koa-router');
// const blog = require('./blog/blog.router.js');
// const article = require('./article/article.router.js');
// const url = require('./url/url.router.js');

const router = new Router();
class Routers{
    static init(app) {
        const urls = ['blog', 'article', 'url'];
        urls.forEach((item, index)=>{
            const r = require(`./${item}/${item}.router.js`);
            router.use('', r.routes(), r.allowedMethods());            
        });
        // router.use('', blog.routes(), blog.allowedMethods());
        // router.use('', article.routes(), article.allowedMethods());
        router.get("/*", ctx => {
            ctx.body = {status:'success',data:'未挂接路由部分.'};
        });
        return router.routes();
    };
}
module.exports = Routers;
