//用户管理模块

//保存
export function save() {
  return {
     url:'user/save',
     type:'post',
     data:{
      "code": 200,
      "msg": null,
      "data": 1
     }
  }
}

//修改
export function update() {
return {
  url:'user/update',
  type:'post',
  data: {
    "code": 200,
    "msg": null,
    "data": 1
  }
}
}
//删除
export function batchDelete() {
  return {
     url:'user/delete',
     type:'post',
     data: {
        "code":200,
        "msg": null,
        "data": 1
     }
  }
}

let findPageData = {
  "code":200,
  "msg":null,
  "data":{}
}

//分页查询
export function findPage(params) {
  let pageNum = 1
  let pageSize = 8
  if(params !== null){
    //pageNum = params.pageNum
  }
  if(params !==null) {
    //pageSize = params.pageSize
  }
  let content = this.getContent(pageNum,pageSize)
  findPageData.data.pageNum = pageNum
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = 50
  findPageData.data.content= content
  return {
    url:'user/findPage',
    type:'post',
    data: findPageData
  }
}
export function getContent(pageNum,pageSize) {
  let content = []
  for(let i=0;i<pageSize; i++) {
    let obj = {}
    let index = ((pageNum - 1) * pageSize)+i+1
    obj.id = index
    obj.name = 'MKLM'+ index
    obj.password = '1234567'
    obj.salt = 'YzcmCZNvbXocrsz9dm8e'
    obj.email = 'kitty'+ index +'@qq.com'
    obj.mobile = '18333332222'
    obj.status = 1
    obj.deptId = 12
    obj.deptName = '技术部'
    if(i%2 ==0) {
      obj.deptId = 13
      obj.deptName = '市场部'
    }
    content.push(obj)
  }
  return content
}
//查找用户的菜单权限标识集合
export function findPermissions() {
   let permsData = {
      "code":200,
      "msg" : null,
      "data" :[
        null,
        "sys:user:view",
        "sys:menu:delete",
        "sys:dept:edit",
        "sys:menu:add",
        "sys:user:add",
        "sys:log:view",
        "sys:dept:delete",
        "sys:role:edit",
        "sys:role:view",
        "sys:user:edit",
        "sys:user:delete",
        "sys:dept:view",
        "sys:dept:add",
        "sys:role:delete",
        "sys:menu:view",
        "sys:menu:edit",
        "sys:role:add",
        "sys:dict:edit",
        "sys:dict:delete"
      ]
   }
   return {
      url: 'user/findPermissions',
      type: 'get',
      data : permsData
   }
}
