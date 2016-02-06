'use strict';

const TagModel = require('../tag/tag.model.js');
var mongoose = require('mongoose');
const Tag = mongoose.model('tag');

class TagController{
    static async index(ctx, next){
        const docs = await TagModel.findAll();
        await ctx.render('tag/index', {items:docs, channel:'tags'});
    }
    // static async show(ctx, next){
    //     const doc = await TagModel.find(ctx.params.id);
    //     await ctx.render('tag/show', doc._doc);
    // }
}
module.exports = TagController;


        