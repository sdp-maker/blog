<template>
  <transition enter-active-class="animate__animated animate__fadeIn"
  
              appear
              mode="out-in">
    <div class="article-wrap">
      <div v-if="hasArticle">
        <el-card class="blog-content--item"
                 v-for="item in articles"
                 :key="item.id">
          <router-link :to="{name:'article',params:{id:item.id}}">

            <ArticleItem :article="item" />
          </router-link>
        </el-card>
      </div>
      <article v-else
               class="blog-content--item blog-content-never">
        <h3 class="blog-item--title ">很遗憾 没有找到对应的文章</h3>
        <el-button type="primary"
                   @click="routeEditor">去写一篇把</el-button>
      </article>
    </div>
  </transition>
</template>

<script>
import ArticleItem from '@/components/article/ArticleItem'
import QS from 'qs'
export default {
  name: 'ArticleList',
  inject: ['closeLoadClock'],

  components: {
    ArticleItem
  },
  props: {
    loading: {
      type: Boolean
    },
    columnId: {
      type: String
    }
  },
  data () {
    return {
      articles: [],
      page: 1,
      size: 4,
      q: '',
    };
  },
  computed: {
    hasArticle () {
      return this.articles.length > 0
    }
  },
  mounted () {
    this.$EventBus.$off('activeSearch', this.searchArticle)
    this.$EventBus.$on('activeSearch', this.searchArticle)
  },
  watch: {
    loading (load) {
      if (load) {
        this.getArticles()
      }
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    searchArticle () {
      (q) => {
        this.q = q
        this.resetArticles()
        this.getArticles()
      }
    },
    resetArticles () {
      this.articles = []
      this.page = 1
    },
    routeEditor () {
      let columnId = this.columnId
      this.$router.push({ name: 'editor', query: { columnId } })
    },
    getQuery () {
      let column = this.columnId
      let q = this.q || undefined
      let query = JSON.parse(JSON.stringify({
        column, q
      }))
      return query
    },

    getArticles () {
      let data = { size: this.size, page: this.page }
      let query = this.getQuery()
      if (Object.entries(query).length > 0) {
        data.query = QS.stringify(query)
      }

      this.$api({ type: 'articles', data }).then(result => {
        if (this.articles.length >= result.total) {
          //没有更多了
          console.log('没有更多了')
          return
        }
        this.articles.push(...result.list)
        this.closeLoadClock() //调用父组件provide传递的关闭load锁方法
        this.page++
      }).catch(err => {
        this.$notify.success({
          title: '获取失败',
          message: err.message
        })
      })
    }
  },
};

</script>
<style lang="stylus" >
.blog-item--btn
  margin-top 40px
</style>
