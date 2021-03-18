const mongoose = require('mongoose');
//Lấy Connection String
mongoose.connect('mongodb://localhost/linhblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
});
//Tạo liên kết vs database
const db = mongoose.connection;
//báo lỗi
db.on('error', console.error.bind(console, 'connection error:'));
//báo thành công
db.once('open', function () {
  // we're connected!
  console.log("Kết nối database thành công");
});

module.exports = mongoose