<template>

  <div class=" blogm-article">
    <h1 class="blogm-article--title">{{article.title}}</h1>
    <ArticleBarInfo :info="info"
                    :id="article.id" />
                    
    <article class="markdown-body blogm-article--content"
             v-once
             v-html="article.content">
    </article>
  </div>
</template>

<script>
import ArticleBarInfo from '@/components/m/ArticleBarInfo'
export default {
  name: 'ArticleContent',
  components: {
    ArticleBarInfo
  },
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
  data () {
    return {

    };
  },
  mounted () {

  },
  methods: {

  },
  computed: {
    info () {
      let { like_num, hit_num, comment_num, date } = this.article
      return {
        like_num, hit_num, comment_num, date, nikname: this.nikname, cover: this.cover
      }
    },
    cover () {
      return this.article?.author?.avatar
    },
    nikname () {
      return this.article?.author?.nikname || '侠名'
    }
  }
};
</script>

<style lang="stylus" >
.blogm-article--title
  padding-bottom 0.3em
  margin 0.67em 0 0.2em
  line-height 1.25
  border-bottom 1px solid #eaecef
  font-weight 600
  font-size 2em
.blogm-article
  background-color #fff
  padding 8px
  & pre
    white-space pre-wrap
.blogm-article--content
  padding-top 1em
</style>