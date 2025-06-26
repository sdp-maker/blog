<template>
  <div class="blogm-article--wrap">
    <ArticleContent :article="article"
                    v-if="article.id" />
    <ArticleComment :comments="article.comments" />

    
    <van-action-sheet v-model="showComment"
                      title="评论">
      <div class="blogm-action--content">
        <van-divider />
        <van-field v-model="comment"
                   style="min-height:120px"
                   rows="2"
                   type="textarea"
                   size="large"
                   maxlength="100"
                   autosize
                   placeholder="请输入留言"
                   show-word-limit />
        <van-button type="info"
                    @click="onSubmitComment"
                    block>提交</van-button>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { Notify } from 'vant'
import ArticleContent from '@/components/m/ArticleContent'
import ArticleComment from '@/components/m/ArticleComment'
export default {
  name: 'Article',
  components: {
    ArticleContent, ArticleComment
  },
  data () {
    return {
      id: '',
      article: {},
      comment: '',
      showComment: false
    };
  },
  created () {
    this.id = this.$route.params.id
    this.getArticleById()

    this.$EventBus.$on('show-comment-action', this.showCommentAction)
  },
  beforeDestroy () {
    this.$EventBus.$off('show-comment-action', this.showCommentAction)
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
        Notify({ type: 'warning', message: '获取失败' })
      }
    },
    showCommentAction () {
      //判断是否已登录 未登录跳转登录页面
      console.log(!this.$store.state.token)
      if (!this.$store.state.token) {
        Notify({ type: 'warning', message: '请先登录' })
        this.$EventBus.$emit('dialog-show', 'login')
        return false
      }
      this.showComment = true

    },
    async onSubmitComment () {
      if (!(this.comment.trim().length > 0)) {
        Notify({ type: 'warning', message: '请输入评论内容' })
        return false
      }
      try {
        await this.$api({ type: 'postComment', data: { aid: this.id, content: this.comment } })
        Notify({
          type: "success",
          message: '评论成功',
        })
        this.getArticleById()
      } catch (err) {
        Notify({
          type: "danger",
          message: '评论失败',
        })
      }
      this.resetComment()
    },
    resetComment () {
      this.showComment = false
      this.comment = ''
    }
  },
};
</script>
<style lang="stylus" >
.blogm-action--content
  padding 20px 10px 20px
</style>

