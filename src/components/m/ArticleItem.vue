<template>
  <van-card class="blogm-item"
            :desc="article.title"
            :thumb="article.cover">
    <template #title>
      <h3 class=" van-ellipsis blogm-item--title">{{article.title}}</h3>
    </template>
    <template #desc>
      <p class="van-ellipsis">
        
        {{nikname}}
      </p>
    </template>
    <template #num>
      <p>{{article.date}}</p>
    </template>
  </van-card>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object
    }
  },
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  },
  computed: {
    content () {
      let content = this.article.content.match(/>([^<>]+)</)?.[1]
      return content || '默认内容'
    },
    nikname () {
      return this.article.author?.nikname || '默认昵称'
    }
  }
};
</script>


<style lang="stylus" >
.blogm-item
  margin-top 2px
  & p
    padding 4px 2px
.blogm-item--title
  font-weight 600
  font-size 1.3em
  padding-bottom 0.33em
</style>