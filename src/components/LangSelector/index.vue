<template>
   <el-dropdown class="lang-selector" @command="handleCommand">
          <span class="el-dropdown-link">
            <span id="language">中文<i class="el-icon-arrow-down el-icon--right"></i></span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
</template>

<script>
export default {
  methods: {
    handleCommand:function(command){
        let lang = command === ""? "zh" : command
        this.$i18n.locale = lang
        document.getElementById("language").innerHTML=lang=="zh"?"中文":"English"
     }
  }
}
</script>
