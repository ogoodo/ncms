'use strict';

const Router = require('koa-router');
const controller = require('./index.controller.js');

const router = new Router({
	//prefix: '/article'
})


router.get('/', controller.index_page);
router.get('/index', controller.index_page);
module.exports = router;

