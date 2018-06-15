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

    <div class="demo-row">
      <div class="bs-box corner2"></div>
      <div class="bs-code">
        <pre>
    background: #58a;
    background:linear-gradient(-135deg,transparent 50%,rgba(0,0,0,.3) 0),
              linear-gradient(to left bottom,transparent 15px,#58a 0);
    background-size: 22px 22px,auto;
    background-repeat: no-repeat;
    background-position:100% 0 ;
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box corner3"></div>
      <div class="bs-code">
        <pre>
    position: relative;
    background: #58a;
    background: linear-gradient(-143deg,transparent 20px,#58a 0);

    ::before

    content: "";
    position: absolute;
    width: 34px;
    height: 27px;
    top:0;right:0;
    background: linear-gradient(to bottom left,transparent 50%,rgba(0,0,0,.3) 0);
    border-bottom-left-radius: 6px;
    box-shadow: -1px 1px 3px -1px rgba(0,0,0,.1);
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
      &.corner2
        background #58a
        background linear-gradient(-135deg,transparent 50%,rgba(0,0,0,.3) 0),linear-gradient(to left bottom,transparent 15px,#58a 0)
        background-size 22px 22px,auto
        background-repeat no-repeat
        background-position 100% 0
      &.corner3
        position relative
        background #58a
        background linear-gradient(-143deg,transparent 20px,#58a 0)
        border none
        &:before
          content ""
          position absolute
          width 34px
          height 27px
          top 0
          right 0
          background linear-gradient(to bottom left,transparent 50%,rgba(0,0,0,.3) 0)
          border-bottom-left-radius  6px
          box-shadow -1px 1px 3px -1px rgba(0,0,0,.1)
    .bs-code
      flex 1
      width 0
      padding 20px 0 0 20px
      font-size 16px
      font-weight 500
      background rgba(0,0,0,.7)
      color #fff
</style>
