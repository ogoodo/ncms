'use strict';

const Router = require('koa-router');
const controller = require('./mongo.controller.js');
//const controller = require('./mongo.model.js');

const router = new Router({
	//prefix: '/article'
})

router.get('/mongo/clear', controller.clear);
router.get('/mongo/coll', controller.coll);
router.get('/mongo/drop', controller.drop);
router.get('/mongo/', controller.index);
//debugger;
module.exports = router;


