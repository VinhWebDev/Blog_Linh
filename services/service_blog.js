
const { json } = require("body-parser");
var blogModel = require("../models/model_blog");

async function getBlogById(id) {
    try {
        var blog = await blogModel.findOne({ "_id": id })
        var view = blog.view + 1;
        await blogModel.findOneAndUpdate({ "_id": id }, { view: view })
        return blog

    } catch (error) {
        console.log("Can not find blog: " + error);
        return error
    }
}

async function getBoundaryBlog(id) {
    console.log("Current Blog ID222222222222222:", id);
    try {
        var previous = await blogModel.findOne({ _id: { $lt: id } }).sort({ _id: -1 })
        var next = await blogModel.findOne({ _id: { $gt: id } }).sort({ _id: 1 })
        //console.log("PREVIOUS BLOG: ",previous);
        //console.log("NEXT BLOG: ",next);
        return {
            previous: previous,
            next: next
        }
    } catch (error) {
        return "Get previous & next pblog failed:" + error;

    }
}

module.exports = {
    getBoundaryBlog,
    getBlogById
}