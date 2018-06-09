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
                    <router-link active-class="bs-click-area" :to="child.url">
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

<style lang="stylus" rel="stylesheet/stylus">
.bs-click-area
    position relative
    &:after
      position absolute
      content ''
      top -10px
      left -10px
      right -10px
      bottom -10px
</style>
