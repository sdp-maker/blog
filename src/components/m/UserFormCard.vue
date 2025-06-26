<template>
  <div>
    <van-image round
               width="5rem"
               height="5rem"
               :src="require('@/assets/img/logo.jpg')" />
               
    <div class="blogm-users--content">
      <h2 class="blogm-users--title">{{name}}</h2>
      <BaseForm :type="type" />
    </div>
    <div class="blogm-users--btns">
      <van-button type="info"
                  block>{{name}}</van-button>
    </div>
  </div>
</template>

<script>
const TYPE_MAP = {
  'login': '登录',
  'register': '注册'
}
import BaseForm from '@/components/m/BaseForm'
export default {
  name: 'UserFormCard',
  props: {
    type: {
      type: String
    }
  },
  components: {
    BaseForm
  },
  data () {
    return {

    };
  },
  computed: {
    name () {
      return TYPE_MAP[this.type] || '登录'
    }
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>