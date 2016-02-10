'use strict';
const Router = require('koa-router');

const router = new Router();
class AdminRouters{
    static init(app) {
        const urls = ['mongo', ];
        urls.forEach((item, index)=>{
            const filename = `./${item}/${item}.router.js`;
            console.log(filename);
            const r = require(filename);
            router.use('', r.routes(), r.allowedMethods());            
        });
        return router;
    };
}
module.exports = AdminRouters;
