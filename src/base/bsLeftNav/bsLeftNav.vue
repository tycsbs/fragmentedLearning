<template>
<div>
  <Row>
    <i-col>
        <i-menu>
            <submenu :name="menu.name"
            v-show="menuList.length"
            v-for="(menu , index) in menuList"
            :key="index"
            >
                <template slot="title">
                    <icon type="ios-paper"></icon>
                      {{menu.label}}
                </template>
                <menu-item v-for="(child , count) in menu.children"
                :key="child.text" :name="`menu.name_${count}`">
                    <router-link tag="span" :to="child.url">
                      {{child.text}}
                      </router-link>
                </menu-item>
            </submenu>
        </i-menu>
    </i-col>
  </Row>
</div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    menuList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.bs-nav-wrapper
  height 100%
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
