<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
import _isMobile from '@/util/isMobile'
export default {
  name: 'app',
  created () {

  },
  mounted () {
    _isMobile() && this.$router.replace('/m')
  },
  methods: {

  }
}
</script>

<style lang="stylus">
html, body
  overflow hidden
  height 100vh
</style>
