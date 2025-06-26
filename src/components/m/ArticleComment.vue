<template>
  <div class=" blogm-article--comment">
    <van-cell-group>
      <template #title>
        <h3 class="blogm-article--head">评论区</h3>
      </template>
      

      <div v-if="hasComment">
        <div class="blogm-article--padline"
             v-for="comment in comments"
             :key="comment.id">
          <van-cell :title="comment.uid.nikname"
                    :value="comment.date" />
          <van-cell :value="comment.content" />
        </div>
      </div>
      <van-empty v-else
                 description="暂无评论" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'ArticleComment',
  props: {
    comments: {
      type: Array
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
    hasComment () {
      return this.comments?.length
    }
  }
};
</script>

<style lang="stylus" >
.blogm-article--padline
  border-bottom 3px solid #f1f1f1
.blogm-article--head
  padding 8px
  font-size 1.6em
  color #888
  font-weight 600
  text-align center
</style>