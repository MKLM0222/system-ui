import Mock from "mockjs"//es6引入mock模块

Mock.mock("http://localhost:8080/login",{
  data:{
    "token":Math.random().toString().slice(2)
    //其他数据
  }
})

Mock.mock("http://localhost:8080/user",{
  "name":'@name',//随机生成姓名
  'email':'@email',//随机生成邮箱
  'age|1-10':5
})
Mock.mock("http://localhost:8080/menu",{
   "id":"@increment",
   "name":"menu",
   "order|10-20":12
})
