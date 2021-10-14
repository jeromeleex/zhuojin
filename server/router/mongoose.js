const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/blog5",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //查找和修改
  useFindAndModify:true
})
.then(()=>console.log("数据库连接成功"))
.catch(e=>console.log("数据库连接失败",e.message))