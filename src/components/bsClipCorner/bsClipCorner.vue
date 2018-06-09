<template>
  <div class="clip-corner-wrapper">
    <div class="demo-row">
      <div class="bs-box corner1">

      </div>
      <div class="bs-code">
        <pre>
    background: #58a;
    background: linear-gradient(-45deg,transparent 15px,#58a 0),
                linear-gradient(45deg,transparent 15px,#f60 0);
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box corner2">

      </div>
      <div class="bs-code">
        <pre>
    background: #58a;
    background: linear-gradient(-45deg,transparent 15px,#58a 0) right,linear-gradient(45deg,transparent 15px,#f60 0) left;
    background-size:50% 100%;
    background-repeat: no-repeat;
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
      margin-right 10px
      box-shadow 0 0 2px rgba(20, 20, 20, .5)
      &.corner1
        padding 8px
        border none
        color #fff
        background #58a
        background linear-gradient(-45deg,transparent 15px,#58a 0),linear-gradient(45deg,transparent 15px,#f60 0)
      &.corner2
        padding 8px
        border none
        color  #fff
        box-sizing  border-box
        background  #58a
        background  linear-gradient(-45deg,transparent 15px,#58a 0) right,linear-gradient(45deg,transparent 15px,#f60 0) left
        background-size 50% 100%
        background-repeat  no-repeat
    .bs-code
      flex 1
      width 0
      padding 20px 0 0 20px
      font-size 16px
      font-weight 500
      background rgba(0,0,0,.7)
      color #fff
</style>
