//跨域中间件
const cors = require("cors")

module.exports = cors({
  //当axios配置了withCredentials，需要设置具体的地址，以及credentials
  origin: ['http://localhost:8081','http://localhost:8080'],
  credentials: true
})








