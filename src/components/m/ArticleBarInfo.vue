<template>
  <van-card class="blogm-item"
            :desc="info.date">
    <template #thumb>
      <van-image round
                 width="80"
                 height="80"
                 :src="info.cover" />
                 
    </template>
    <template #title>
      <h3 class="van-ellipsis blogm-item--title">{{info.nikname}}</h3>
    </template>
    <template #num>
      <div class="van-ellipsis blogm-item--title blogm-item--details">
        <van-icon name="like" /> <span>{{info.like_num}}</span>
        <van-icon name="eye" /> <span>{{info.hit_num}}</span>
        <van-icon name="comment" /> <span>{{info.comment_num}}</span>

      </div>
    </template>

  </van-card>
</template>

<script>
export default {
  name: 'ArticleBarInfo',
  props: {
    info: {
      type: Object,
    },
    id: {
      type: String
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
};
</script>

<style lang="stylus" >
.blogm-item--details
  display flex
  align-items center
  & .van-icon
    padding-left 1.2em
  & span
    padding-left 0.23em
</style>