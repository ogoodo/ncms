'use strict';

const Router = require('koa-router');
const controller = require('./url.controller.js');

const router = new Router({
	prefix: '/url'
})


router.get('/add', controller.add);  
router.post('/add', controller.save);
//router.post('/', controller.save);
router.get('/edit/:id', controller.edit);
router.post('/edit/:id', controller.save);
//router.get('/delete/:id', controller.delete);   
router.delete('/:id', controller.delete);           
router.get('/:id', controller.show);
router.get('/', controller.index);
module.exports = router;

