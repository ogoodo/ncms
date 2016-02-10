'use strict';

const Router = require('koa-router');
//const controller = require('./mongo.controller.js');
const controller = require('./mongo.model.js');

const router = new Router({
	//prefix: '/article'
})

router.get('/mongo/drop', controller.dropDatabase);
router.get('/mongo/clear', controller.clearDocs);
router.get('/mongo/coll', controller.dropCollections);
//debugger;
module.exports = router;


