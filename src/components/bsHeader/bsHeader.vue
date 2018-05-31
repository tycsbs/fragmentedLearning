<template>
    <div class="bs-header-wrapper">
       <i-menu mode="horizontal"
        :theme="theme"
        @on-select="selectItem">
        <menu-item name="1">
            <icon type="ios-paper"></icon>
            <router-link tag="span" to="/css">
              CSS学习
            </router-link>
        </menu-item>
        <menu-item name="2">
            <icon type="ios-people"></icon>
            <router-link tag="span" to="/css">
              javascript学习
            </router-link>
        </menu-item>
        <!-- <submenu name="3">
            <template slot="title">
                <icon type="stats-bars"></icon>
                统计分析
            </template>
            <menu-group title="使用">
                <menu-item name="3-1">新增和启动</menu-item>
                <menu-item name="3-2">活跃分析</menu-item>
                <menu-item name="3-3">时段分析</menu-item>
            </menu-group>
            <menu-group title="留存">
                <menu-item name="3-4">用户留存</menu-item>
                <menu-item name="3-5">流失用户</menu-item>
            </menu-group>
        </submenu> -->
        <menu-item name="4">
            <icon type="settings"></icon>
             <router-link tag="span" to="/css">
              源码学习
            </router-link>
        </menu-item>
         <menu-item name="5">
            <icon type="settings"></icon>
             <router-link tag="span" to="/css">
              框架学习
            </router-link>
        </menu-item>
      </i-menu>

      <!-- <radio-group v-model="theme">
          <radio label="light"></radio>
          <radio label="dark"></radio>
          <radio label="primary"></radio>
      </radio-group> -->
    </div>
</template>

<script type="text/ecmascript-6" scoped>
export default {
  data () {
    return {
      theme: 'light'
    }
  },
  methods: {
    selectItem (name) {
      console.log(name)
    }
  }
}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">

</style>
