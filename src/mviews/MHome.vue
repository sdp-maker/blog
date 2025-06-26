<template>
  <div class="blogm-page">

    <Header />
    <div class="blogm-content">
      <transition enter-active-class="animate__animated animate__fadeInRight"
                  appear
                  mode="out-in">
        <router-view></router-view>
        
      </transition>
    </div>
    <FootBar />
    <BaseDialog />
  </div>
</template>

<script>
import Header from '@/mviews/Header'
import FootBar from '@/mviews/FootBar'
import BaseDialog from '@/components/m/BaseDialog'
export default {
  name: 'Home',
  components: {
    Header,
    FootBar,
    BaseDialog
  },
  data () {
    return {

    }
  }
}
</script>
<style lang="stylus" >
.blogm-content
  overflow hidden
  overflow-y auto
  height calc(100vh - 105px)
  background-color #f1f1f1
.animate__fadeInRight
  animation-duration 0.5s
</style>
