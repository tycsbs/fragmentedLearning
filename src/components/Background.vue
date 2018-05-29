<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Fragmented Learning</h1>
    <!-- <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link> -->
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 .m-header
    position: relative
    height: 44px
    text-align: center
    background: rgba(100,100,100,.5)
    color: #fff
    font-weight 700
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: 14px
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: #f66
</style>
