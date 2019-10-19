//日志管理模块

//分页查询
export function findPage(params) {
   let findPageData = {
       "code" : 200,
       "msg" : null,
       "data" : {}
   }
   let pageNum =1
   let pageSize = 8
   if(params !== null) {
      // pageNum = params.pageNum
    }
    if(params !== null) {
      // pageSize = params.pageSize
    }
    let content = this.getContent(pageNum, pageSize)
    findPageData.data.pageNum = pageNum
    findPageData.data.pageSize = pageSize
    findPageData.data.totalSize = 50
    findPageData.data.content = content
    return {
       url:'log/findPage',
       type:'post',
       data:findPageData
    }
}

export function getContent(pageNum,pageSize) {
    let content =[]
    for(let i=0;i<pageSize;i++) {
      let obj = {}
      let index = ((pageNum-1)*pageSize)+i+1
      obj.id = index
      obj.userName = 'operation'
      obj.method = 'com.louis.controller.sysUserController.findPage'
      obj.params = '{"pageNum":"1",pageSize:"8"}'
      obj.time = 12
      obj.ip='127.0.0.1'
      obj.remark = 'remark log' + index
      if(i%2==0){

      }
      obj.createBy = 'admin'
      obj.createTime = '2019-09-14 11:11:11'
      content.push(obj)
    }
    return content
}
