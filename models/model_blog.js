const mongoose = require("../confix/config_mongo");
// const database = require("../config/config_mongo");
//Tạo bản thiết kế (Schema)
var schema_blog = new mongoose.Schema({
    //Các thuộc tính + kiểu dữ liệu của bảng 
    title: String,
    subTitle: String,
    content: String,
    upload: String,
    view: {
        type: Number,
        default: 0
    },
    comment: [],
    like: {
        type: Number,
        default: 0
    },
    category: String,
    image: String
}, {
    //Đặt tên collection để tránh khi db lưu vào mongo bị chuyển sang dạng số nhiều (thêm s)
    collection: 'Blog'
})

var model_blog = mongoose.model("blog", schema_blog);
module.exports = model_blog;