<template>
  <div id="app" class="bs-container">
    <div class="header-wrapper">
      <bs-header></bs-header>
    </div>
    <div class="content-wrapper">
        <keep-alive>
          <router-view/>
        </keep-alive>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BsHeader from '@/components/bsHeader/bsHeader'
export default {
  name: 'App',
  components: {
    BsHeader
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus">
html, body
  height 100%
  overflow hidden
  .bs-container
    height 100%
    overflow hidden
    .header-wrapper
      height 60px
    .content-wrapper
      height calc(100% - 60px)
      overflow hidden
</style>
