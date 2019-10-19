const navTreeData = {
  "code": 200,
  "msg": null,
  "data":  [
      {
        "id": 1,
        "parentId": 0,
        "name": "系统管理",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "el-icon-setting",
        "orderNum": 0,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "delFlag": 0,
        "children": [
          {
            "id": 2,
            "parentId": 1,
            "name": "用户管理",
            "url": "/sys/user",
            "perms": null,
            "type": 1,
            "icon": "el-icon-service",
            "orderNum": 1,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 3,
            "parentId": 1,
            "name": "机构管理",
            "url": "/sys/dept",
            "perms": null,
            "type": 1,
            "icon": "el-icon-news",
            "orderNum": 2,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 4,
            "parentId": 1,
            "name": "角色管理",
            "url": "/sys/role",
            "perms": null,
            "type": 1,
            "icon": "el-icon-view",
            "orderNum": 4,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 5,
            "parentId": 1,
            "name": "菜单管理",
            "url": "/sys/menu",
            "perms": null,
            "type": 1,
            "icon": "el-icon-menu",
            "orderNum": 5,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 6,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "parentId": 1,
            "name": "字典管理",
            "url": "/sys/dict",
            "perms": null,
            "type": 1,
            "icon": "el-icon-edit-outline",
            "orderNum": 7,
            "delFlag": 0,
            "parentName": "系统管理",
            "level": 1,
            "children": []
          }
        ]
      },
      {
        "id": 25,
        "parentId": 0,
        "name": "系统监控",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "el-icon-info",
        "orderNum": 0,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "delFlag": 0,
        "children": [
          {
            "id": 7,
            "parentId": 25,
            "name": "SQL监控",
            "url": "/druid/sql",
            "perms": null,
            "type": 1,
            "icon": "el-icon-info",
            "orderNum": 6,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 8,
            "parentId": 25,
            "name": "系统日志",
            "url": "/druid/log",
            "perms": "sys:log:view",
            "type": 1,
            "icon": "el-icon-info",
            "orderNum": 7,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          }
        ]
      },
      {
        "id": 28,
        "parentId": 0,
        "name": "使用案例",
        "url": null,
        "perms": null,
        "type": 0,
        "icon": "el-icon-picture-outline",
        "orderNum": 0,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "delFlag": 0,
        "children": [
          {
            "id": 29,
            "parentId": 28,
            "name": "国际化",
            "url": "/demo/i18n",
            "perms": null,
            "type": 1,
            "icon": "el-icon-edit",
            "orderNum": 1,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          },
          {
            "id": 30,
            "parentId": 28,
            "name": "换皮肤",
            "url": "/demo/theme",
            "perms": null,
            "type": 1,
            "icon": "el-icon-picture",
            "orderNum": 2,
            "createBy": null,
            "createTime": null,
            "lastUpdateBy": null,
            "lastUpdateTime": null,
            "delFlag": 0,
            "children": []
          }
        ]
      }
    ]
}

export function findNavTree() {
  return {
    //isOpen:false
    url:'menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}
