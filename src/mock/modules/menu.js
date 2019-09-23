export function getMenu() {
  return {
    //isOpen:false
    url:'http://localhost:8080/login',
    type: 'get',
    data: {
      'msg':'success',
      'code': 0,
      'data':{
        'id':'@increment',
        'name':'menu',
        'order|10-20':12
      }
    }
  }
}
