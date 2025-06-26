<template>
  <div v-if="article.id">
    <ArticleContent :article="article" />
    <CommentTextArea :aid="article.id" />
    <CommentList :comments="article.comments" />
  </div>
</template>


<script>
import ArticleContent from '@/components/article/ArticleContent'
import CommentTextArea from '@/components/comment/CommentTextArea'
import CommentList from '@/components/comment/CommentList'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('likes')
export default {
  name: 'Article',
  components: {
    ArticleContent, CommentList, CommentTextArea
  },
  provide () {
    return {
      getArticleById: this.getArticleById
    }
  },
  data () {
    return {
      id: '',
      article: {}
    };
  },
  created () {
    this.id = this.$route.params.id
    this.getArticleById()
  },

  methods: {
    async getArticleById () {
      try {
        this.article = await this.$api({ type: 'getArticleById', data: { id: this.id } })

        let likeUsers = this.article?.like_users || []
        let uid = this.$store.getters.userInfo?._id
        let aid = this.article?.id
        if (likeUsers.includes(uid)) {
          this.pushLike({ aid })
        }
      } catch (err) {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      }

    },
    ...mapActions(['pushLike', 'sendLikes'])
  }
};
</script>

<style lang="stylus" >
.blog-main--card
  width 80%
</style>