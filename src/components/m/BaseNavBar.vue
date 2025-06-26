<template>
  <van-nav-bar :title="title"
               left-text="返回"
               left-arrow
               @click-left="$router.back()">
    <template #right>
      <van-button v-if="button"
                  size="mini"
                  @click="onClickRight"
                  type="info">{{button}}</van-button>
    </template>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'BaseNavBar',
  props: {
    title: {
      type: String
    },
    button: {
      type: String
    },
    handler: {
      type: String
    }
  },
  data () {
    return {
      value: '',
    };
  },
  mounted () {

  },
  methods: {
    onClickRight () {
      this.$EventBus.$emit(this.handler)
    }
  },
  
};
</script>
