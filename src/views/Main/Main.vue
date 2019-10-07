<template>
  <div class="container" :class="$store.state.app.collapse?'menu-bar-collapse-width':'menu-bar-width'">
    <el-breadcrumb  separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
         <a href="www.baidu.com">{{item.name}}</a>
      </el-breadcrumb-item>
      <transition name="fade" mode="out-in">
          <router-view class="content"></router-view>
      </transition>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.container {
  position:absolute;
  top:60px;
  bottom:0px;
  left:1px;
  right:1px;
  border-color:rgba(148,145,147,0.2);
  border-left-width:1px;
  border-left-style:solid;
  .breadcrumb {
    padding:10px;
    border-color:rgba(38,86,114,0.2);
    border-bottom-width:1px;
    border-bottom-style:solid;
    background:rgba(138,158,170,0.2)
  }
  .content {
    margin-top:-25px;
    margin-bottom: 5px;
    padding-top: 5px;
  }
}
 .menu-bar-width {
    left:200px;
  }
  .menu-bar-collapse-width {
    left: 65px;
  }

</style>
