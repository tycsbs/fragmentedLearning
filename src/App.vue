<template>
  <div id="app">
    <div class="header-wrapper">
      <bs-header></bs-header>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
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

<style rel="stylesheet/stylus" lang="stylus" scoped>

</style>
