<template>
  <div class="bs-style-wrapper">
    <div class="bs-left-nav">
        <bs-left-nav :menuList="menuItem"></bs-left-nav>
    </div>
    <div class="bs-main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BsLeftNav from '@/base/bsLeftNav/bsLeftNav'
export default {
  data () {
    return {
      menuItem: [
        {
          name: 'background',
          label: '背景颜色',
          children: [
            {
              url: '/css/background',
              text: '颜色渐变'
            },
            {
              url: '/css/clipCorner',
              text: '切角效果'
            }
          ]
        },
        {
          name: 'borderRadius',
          label: '圆角',
          children: [
            {
              url: '/css/borderRadius',
              text: 'border-radius'
            }
          ]
        }
      ]
    }
  },
  components: {
    BsLeftNav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/variable.styl'
.bs-style-wrapper
  display flex
  height 100%
  background-color: #f9f9f9
  .bs-left-nav
    width $width-left-nav
  .bs-main-content
    flex 1
    background-color #efefef
    overflow auto
</style>
