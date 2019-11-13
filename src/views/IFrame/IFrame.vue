<template>
  <div class="iframe-container">
    <iframe :src="src"
    scrolling='auto' frameborder='0' class="frame"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src:''
    }
  },
  methods: {
    //获取路径
    resetSrc: function(url) {
      this.src = 'https://www.google.com/search?newwindow=1&sxsrf=ACYBGNRaPuX2rXgcn9YRiRsyMloFSQGZkw%3A1573633682237&ei=kr7LXYv_DayIr7wPkf-7wAs&q=druid+monitor&oq=druid&gs_l=psy-ab.1.0.35i39l2j0i203l5j0l3.1053122.1055629..1057508...6.0..0.137.1104.1j8......0....1..gws-wiz.....10..0i10j0i13j35i304i39j35i362i39j0i273j0i67.J1C0miIwzK4'
    }
  },
  mounted() {
    this.resetSrc(this.$store.state.iframe.iframeUrl)
  },
  watch: {
    $route: {
      handler:function(val,oldVal) {
        //如果是跳转到嵌套页面，切换iframe的url
        this.resetSrc(val.path)
      }
    }
  }

}
</script>

<style lang="scss">
.iframe-container {
  position: absolute;
  top:60px;
  left:0px;
  right:0px;
  margin-top:-29px;
  .frame{
    position:relative;
    top:0px;
    width:100%;
    height:500px;
  }
}
</style>
