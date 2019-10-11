<template>
  <el-button :size="size" :type="type" :loading="loading" :disabled="!hasPerms(perms)" @click="handleClick">{{label}}</el-button>
</template>

<script>
import { hasPermission } from '@/permission/index.js'
export default {
  name: 'KtButton',
  props: {
    label:{//按钮显示文本
      type:String,
      default:'Button'
    },
    size: {//按钮类型
      type:String,
      default: 'small'
    },
    type: {//按钮加载标识
      type:String,
      default:'null'
    },
    loading: {//按钮是否禁用
      type:Boolean,
      default:false
    },
    disabled: {//按钮权限标识，外部使用者传入
      type:Boolean,
      default:false
    },
    perms: {
      type: String,
      default:null
    }
  },
  methods: {
    handleClick: function() {
      //按钮操作处理函数
      this.$emit('click',{})
    },
    hasPerms: function(perms) {
      //根据权限标识和外部知识状态进行权限判断
      return hasPermission(perms) & !this.disabled
    }
  }
}
</script>

<style scoped lang="scss">

</style>
