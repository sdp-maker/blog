<template>
  <div class="blogm-header">
    <component :is="headType"
               :title="title"
               :button="button"
               :handler="buttonHandler"></component>
  </div>
</template>


<script>
import NavBar from '@/components/m/BaseNavBar'
import SearchBar from '@/components/m/BaseSearchBar'
export default {
  name: 'Header',
  components: {
    NavBar, SearchBar
  },
  data () {
    return {
      headType: 'SearchBar',
      title: '默认标题',
      button: '',
      buttonHandler: ''
    }
  },
  watch: {
    $route (to) {
      this.button = ''
      this.buttonHandler = ''
      Object.assign(this, to.meta)
    }
  },
  mounted () {

  },
  methods: {

  },
};
</script>

