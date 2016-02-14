'use strict';

const config = require(process.cwd() + '/config/config.js');
// const ArticleModel = require('../article/article.model.js');
// const TagModel = require('../tag/tag.model.js');
var mongoose = require('mongoose');
//const Article = mongoose.model('article');

class BlogController{
    static async index_page(ctx, next){
        await ctx.render('admin/index/index', {});
    }
}
module.exports = BlogController;

        