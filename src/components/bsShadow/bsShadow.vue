<template>
  <div class="clip-corner-wrapper">
    <div class="demo-row">
      <div class="bs-box corner1"></div>
      <div class="bs-code">
        <pre>
    position: relative;
    line-height:1.5;
    filter: drop-shadow(2px 2px 6px rgba(0,0,0,.75));

    ::after

    position: absolute;
    content:" ";
    width: 20px;
    height: 20px;
    transform: rotate(45deg);
    right:-10px;
    top:85px;
        </pre>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {

    }
  },
  components: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.clip-corner-wrapper
  height 100%
  .demo-row
    display flex
    box-shadow 0 0 2px rgba(20, 20, 20, .5)
    padding 10px 20px
    margin 10px
    .bs-box
      width 240px
      margin-right 30px
      box-shadow 0 0 2px rgba(20, 20, 20, .5)
      &.corner1
        position relative
        background #2c83b2
        color #FFF
        line-height 1.5
        filter drop-shadow(2px 2px 6px rgba(0,0,0,.75))
      &:after
        position absolute
        content " "
        width 20px
        height 20px
        transform rotate(45deg)
        right -10px
        top 85px
        background inherit
    .bs-code
      flex 1
      width 0
      padding 20px 0 0 20px
      font-size 16px
      font-weight 500
      background rgba(0,0,0,.7)
      color #fff
</style>
