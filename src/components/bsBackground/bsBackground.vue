<template>
  <div class="bs-nav-wrapper">
    <div class="demo-row">
      <div class="bs-box demo1"></div>
      <div class="bs-code">
        <pre>
    background #fff
    background-image linear-gradient(90deg,rgba(0, 153, 200, 0.5) 50%,transparent 0),
                    linear-gradient(rgba(0, 153, 200,.5) 50%,transparent 0)
    background-size 20px 20px
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box demo2"></div>
      <div class="bs-code">
        <pre>
    background: #58a;
    background-image: linear-gradient(90deg,#fff 1px,transparent 0),
                      linear-gradient(#fff 1px,transparent 0);
    background-size: 20px 20px;
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box demo3"></div>
      <div class="bs-code">
        <pre>
    background: #58a;
    background-image: linear-gradient(90deg,#fff 1px,transparent 0),
                      linear-gradient(#fff 1px,transparent 0),
                      linear-gradient(#fff 2px,transparent 0),
                      linear-gradient(90deg,#fff 2px,transparent 0);
    background-size: 20px ,20px,60px,60px;
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box demo4"></div>
      <div class="bs-code">
        <pre>
    background: #096;
    background-image:radial-gradient(#fff 20%,transparent 0);
    background-size: 40px 40px;
        </pre>
      </div>
    </div>

    <div class="demo-row">
      <div class="bs-box demo5"></div>
      <div class="bs-code">
        <pre>
    background: #096;
    background-image:radial-gradient(#fff 20%,transparent 0),
                     radial-gradient(#fff 20%,transparent 0);
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
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
    .demo1
      background #fff
      background-image linear-gradient(90deg,rgba(0, 153, 200, 0.5) 50%,transparent 0),
                      linear-gradient(rgba(0, 153, 200,.5) 50%,transparent 0)
      background-size 20px 20px
    .demo2
      background #58a
      background-image linear-gradient(90deg,#fff 1px,transparent 0),
                      linear-gradient(#fff 1px,transparent 0)
      background-size 20px 20px
    .demo3
      background #58a
      background-image linear-gradient(90deg, #fff 1px,transparent 0),
                      linear-gradient(#fff 1px,transparent 0),
                      linear-gradient(#fff 2px,transparent 0),
                      linear-gradient(90deg,#fff 2px,transparent 0)
      background-size 20px, 20px, 40px, 40px
    .demo4
      background #096
      background-image radial-gradient(#fff 20%,transparent 0)
      background-size 40px 40px
    .demo5
      background #096
      background-image radial-gradient(#fff 20%,transparent 0),
                       radial-gradient(#fff 20%,transparent 0)
      background-size 40px 40px
      background-position 0 0, 20px 20px
    .bs-code
      flex 1
      padding 20px 0 0 20px
      font-size 16px
      font-weight 500
      background rgba(0,0,0,.7)
      color #fff
</style>
