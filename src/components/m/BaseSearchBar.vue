<template>
  <van-search v-model="value"
              shape="round"
              show-action
              @focus="onFocus"
              @search="onSearch"
              placeholder="请输入搜索关键词">
    <template #action>
      <span @click="onSearch">搜索</span>
    </template>
  </van-search>
  
</template>

<script>
let time
export default {
  name: 'BaseSearchBar',

  data () {
    return {
      value: '',
      error: false
    };
  },
  mounted () {

  },
  methods: {
    onFocus () {

    },
    onSearch () {
      this.$EventBus.$emit('search-article', this.value)
      this.value = ''
    }
  },
};
</script>

