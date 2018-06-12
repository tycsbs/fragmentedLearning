<template>
    <div class="bs-header-wrapper">
       <i-menu mode="horizontal"
        :theme="theme"
        @on-select="selectItem">
        <menu-item  v-for='(item, index) in menuList' :key='index'
          :name="item.name">
            <icon type="ios-paper"></icon>
            <router-link tag="span" :to='item.url'>
              {{item.name}}
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
      theme: 'light',
      menuList: [{
        name: 'Css 学习',
        url: '/css'
      }, {
        name: 'Javascript 学习',
        url: '/javascript'
      }, {
        name: '框架学习',
        url: '/framework'
      }]
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
