export function login() {
  return {
    //isOpen:false
    url:'http://localhost:8080/login',
    type: 'post',
    data: {
      'msg':'success',
      'code': 0,
      'data':{
        'msg':'success',
        'code':0,
        'data': {
          'token':Math.random().toString().slice(2)
        }
      }
    }
  }
}
