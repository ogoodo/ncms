'use strict';
const Router = require('koa-router');
// const blog = require('./blog/blog.router.js');
// const article = require('./article/article.router.js');
// const url = require('./url/url.router.js');

const router = new Router();
class Routers{
    static init(app) {
        console.log('init router {{');
        const urls = ['blog', 'article', 'url', 'tag'];
        urls.forEach((item, index)=>{
            const filename = `./${item}/${item}.router.js`;
            console.log(filename);
            const r = require(filename);
            router.use('', r.routes(), r.allowedMethods());            
        });
        const admin = require('./admin/admin.router.js').init();
        router.use('/admin', admin.routes(), admin.allowedMethods());
        console.log('init router }}');
        // router.use('', blog.routes(), blog.allowedMethods());
        // router.use('', article.routes(), article.allowedMethods());
        // router.get("/*", ctx => {
        //     ctx.body = {status:'success',data:'未挂接路由部分.'};
        // });
        return router.routes();
    };
}
module.exports = Routers;
