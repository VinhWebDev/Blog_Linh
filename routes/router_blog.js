var express = require('express');
var router = express.Router();
var blogModel = require("../models/model_blog");
var blogService = require("../services/service_blog")
//GET ALL BLOG
router.get("/getAll", async function (req, res) {
  //Get page information
  //console.log(req.query, "Query data");
  var pageSize = parseInt(req.query.pageSize);
  //If no start index => start from 0
  var startIndex = req.query.startIndex ? req.query.startIndex : 0;
  //Get data
  blogModel.find().skip(startIndex).limit(pageSize).then(data => {
    res.json(data);
  }).catch(err => {
    res.json("Get all post fail: " + err)
  })
})

//GET BLOG BY NAME
router.get("/getByName", async function (req, res) {
  //Get page information
  //console.log(req.query, "Query data");
  var pageSize = parseInt(req.query.pageSize);
  //If no start index => start from 0
  var startIndex = req.query.startIndex ? parseInt(req.query.startIndex) : 0;
  console.log(startIndex, "Start index");
  var key = req.query.key;
  //Get data
  blogModel.find({ "title": { "$regex": key, "$options": "i" } }).skip(startIndex).limit(pageSize).then(data => {
    res.json(data);
  }).catch(err => {
    res.json("Get post by name fail: " + err)
  })
})

//GET BY CATEGORY
router.get("/getByCategory", async function (req, res) {
  //Get page information
  //console.log(req.query, "Query data");
  var pageSize = parseInt(req.query.pageSize);
  //If no start index => start from 0
  var startIndex = req.query.startIndex ? req.query.startIndex : 0;
  var key = req.query.key;
  //Get data
  blogModel.find({ "category": key }).skip(startIndex).limit(pageSize).then(data => {
    res.json(data);
  }).catch(err => {
    res.json("Get post by category fail: " + err)
  })
})
//GET BLOG BY ID
router.get("/getByID", async (req, res) => {
  var result = await blogService.getBlogById(req.query.id);
  res.json(result)
})

//GET BLOG DETAILED PAGE
router.get("/blog", async function (req, res) {
  //Get page information
  //console.log(req.query, "Query data");
  var id = req.query.id;
  //blog2

  try {
    boundBlog = await blogService.getBoundaryBlog(id);
    var blogList = {
      previous: boundBlog.previous,
      current: await blogService.getBlogById(id),
      next: boundBlog.next
    }
    //console.log(blogList, "Result");
    if (id == "6033c9f60aa09c47b09fdf19")
      res.render("blog2", blogList)
    else if (id == "603538694e15503eb014cc7b")
      res.render("blog3", blogList)
      else if (id == "603538704e15503eb014cc7c")
      res.render("blog4", blogList)
      else if (id =="6035387b4e15503eb014cc7d")
      res.render("blog5",blogList)
      else if(id =="603538874e15503eb014cc7e")
      res.render("blog6",blogList)
  } catch (error) {
    //console.log("Can not find blog: " + error);
    res.json(error)
  }
})

//CREATE A BLOG
router.post('/create', async (req, res) => {
  //get data
  var title = req.body.title;
  var content = req.body.content;
  var upload = req.body.upload;
  var category = req.body.category;
  var image = req.body.image
  //create new blog
  var blog = {
    title: title,
    subTitle: req.body.subTitle,
    content: content,
    upload: upload,
    category: category,
    image: image
  }
  // console.log(blog);
  blogModel.create(blog).then((data) => {
    console.log(data);
    res.json(data)
  }).catch(err => {
    console.log("Add new blog failed: " + err);
    res.json("Add new blog failed: " + err)
  });

});

//UPDATE A POST
router.put('/update', async (req, res) => {
  //get data
  var title = req.body.title;
  var content = req.body.content;
  var upload = req.body.upload;
  var category = req.body.category;
  var image = req.body.image
  //create new blog
  var blog = {
    title: title,
    content: content,
    upload: upload,
    category: category,
    image: image
  }
  // console.log(blog);
  blogModel.updateOne({ _id: req.body._id }, blog)
    .then(data => {
      res.json(data)
    }).catch(err => {
      console.log("Update error: " + err);
      res.json(err)
    })
});

//COMMENT
router.put('/comment', async (req, res) => {
  //get data
  var comment = req.body.comment;
  var user = req.body.username;
  var date = req.body.date
  console.log("User: " + user + "   ----   " + comment + "   ----   " + date);
  //create new blog
  var blog = await blogModel.findOne({ _id: req.body._id });
  var comments = blog.comment;
  comments.push({ comment: comment, user: user, date: date });
  blog.comment = comments;
  // console.log(blog);
  blogModel.updateOne({ _id: req.body._id }, blog)
    .then(data => {
      res.json(data)
    }).catch(err => {
      console.log("Update error: " + err);
      res.json(err)
    })
});

module.exports = router;
