<template>
  <div class="bs-nav-wrapper">
    <div class="demo-row">
      <div class="bs-demo"></div>
      <div class="bs-code">
        <pre>
      width 240px
      height 240px
      background #fff
      background-image linear-gradient(90deg,rgba(0, 153, 200, 0.5) 50%,transparent 0),
                      linear-gradient(rgba(0, 153, 200,.5) 50%,transparent 0)
      background-size 20px 20px
        </pre>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.bs-nav-wrapper
  .demo-row
    display flex
    padding 10px 20px
    .bs-demo
      width 240px
      height 240px
      background #fff
      background-image linear-gradient(90deg,rgba(0, 153, 200, 0.5) 50%,transparent 0),
                      linear-gradient(rgba(0, 153, 200,.5) 50%,transparent 0)
      background-size 20px 20px
    .bs-code
      flex 1
      padding 20px
      font-size 16px
      font-weight 500
      background rgba(0,0,0,.7)
      color #fff
</style>
