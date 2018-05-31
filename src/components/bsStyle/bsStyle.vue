<template>
  <div class="bs-style-wrapper">
    <div class="bs-left-nav">
      <Row>
        <i-col span="8">
            <i-menu>
                <submenu name="1">
                    <template slot="title">
                        <icon type="ios-paper"></icon>
                         背景颜色
                    </template>
                    <menu-item name="1-1">
                       <router-link tag="span" to="/css/background">
                          linear-gradient
                         </router-link>
                    </menu-item>
                </submenu>
            </i-menu>
        </i-col>
      </Row>
    </div>
    <div class="bs-main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {

}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/variable.styl"
.bs-style-wrapper
  display flex
  min-height 300px
  background-color #f9f9f9
  .bs-left-nav
    width $width-left-nav
  .bs-main-content
    flex 1
    background-color #efefef
</style>
