
const mongoose = require("../config/config_mongo");
//Tạo bản thiết kế (Schema)
var schema_account = mongoose.Schema({
    //Các thuộc tính + kiểu dữ liệu của bảng 
    username: String,
    password: String
},{
    //Đặt tên collection để tránh khi db lưu vào mongo bị chuyển sang dạng số nhiều (thêm s)
    collection:'Account'
})

var model_account = mongoose.model("account",schema_account);
module.exports=model_account;