<template>
  <el-card>
    <div class="blog-article markdown-body">
      <h1 class="blog-article--title">{{article.title}}</h1>
      
      <ArticleBarInfo :info="info"
                      :id="article.id" />
      <div class="blog-article--content"
           v-once
           v-html="article.content">
      </div>
    </div>
  </el-card>
</template>

<script>
import ArticleBarInfo from '@/components/article/ArticleBarInfo'

export default {
  name: 'ArticleContent',
  props: {
    article: {
      type: Object,
      default: function () {
        return {
          title: '默认标题',
          date: "默认日期",
          like_num: 0,
          hit_num: 0,
          comment_num: 0,
          content: ''
        }
      }
    }
  },
  components: {
    ArticleBarInfo
  },
  data () {
    return {

    };
  },
  computed: {
    info () {
      let { like_num, hit_num, comment_num, date } = this.article
      return {
        like_num, hit_num, comment_num, date, nikname: this.nikname
      }
    },
    nikname () {
      return this.article?.author?.nikname || '侠名'
    }
  },
  methods: {

  }

};
</script>

<style lang="stylus" >
@import '~assets/css/base.styl'
.blog-article
  font-size 16px
  background-color line-modifier-color
  border-radius radius-theme-size
.blog-article--title
  font-size 22px
  line-height 26px
  margin 0
  word-break break-word
.blog-article--info
  padding padding-space * 2
  background-color #f7f8fc
  display flex
  justify-content space-between
  color #999
  @media screen and (max-width 768px)
    flex-direction column
    height 120px
.blog-info--item
  padding 0 6px
.blog-article--content
  padding padding-space * 2 0
.blog-article img
  display block
  width 50%
  margin 10px auto
</style>