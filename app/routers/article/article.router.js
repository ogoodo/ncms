'use strict';

const Router = require('koa-router');
const controller = require('./article.controller.js');

const router = new Router({
	//prefix: '/article'
})


router.get   ('/article/add', controller.add);  
router.post  ('/article/add', controller.save);
router.get   ('/article/edit/:id', controller.edit);
router.post  ('/article/edit/:id', controller.save); 
router.delete('/article/:id', controller.delete);           
router.get   ('/article/:id', controller.show);
//router.get('/article/delete/:id', controller.delete);  

router.get('/articles/:index', controller.index_page);
router.get('/articles/', controller.index_page);
module.exports = router;

// router.post('/edit', controller.update);
// router.get('/edit/:id', controller.edit);
// router.get('/delete/:id', controller.delete);  
// router.post('/edit', controller.update);
// router.put('/edit/:id', controller.put);
// router.delete('/:id', controller.delete);
