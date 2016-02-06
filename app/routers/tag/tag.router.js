'use strict';

const Router = require('koa-router');
const controller = require('./tag.controller.js');

const router = new Router({
	//prefix: '/url'
})

      
//router.get('/tag/:id', controller.show);
router.get('/tags', controller.index);
module.exports = router;

