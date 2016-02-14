'use strict';
const Router = require('koa-router');

const router = new Router();
class AdminRouters{
    static init(app) {
        const urls = ['mongo', 'index', ];
        urls.forEach((item, index)=>{
            const filename = `./${item}/${item}.router.js`;
            console.log(filename);
            const r = require(filename);
            router.use('', r.routes(), r.allowedMethods());            
        });
        // router.get("/", ctx => {
        //     ctx.body = {status:'success',data:'admin未挂接路由部分2.'};
        // });
        // router.get("/*", ctx => {
        //     ctx.body = {status:'success',data:'admin未挂接路由部分.'};
        // });
        return router;
    };
}
module.exports = AdminRouters;
