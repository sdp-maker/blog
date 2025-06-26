<template>
  <div class="blogm-list">
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh">
                      
      <van-list v-model="loading"
                :finished="finished"
                offset="100"
                finished-text="没有更多了"
                error-text="获取失败，点击重新加载"
                @load="onLoad">
        <router-link v-for="item in articleList"
                     :key="item.id"
                     :to="{name:'mArticle',params:{id:item.id}}">
          <ArticleItem :article="item" />

        </router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

import ArticleItem from '@/components/m/ArticleItem'
import QS from 'qs'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    columnId: {
      type: String
    }
  },
  data () {
    return {
      articleList: [],
      columnArticleCache: {},
      loading: false,
      finished: false,
      refreshing: false,
      size: 4,
      page: 1,
      q: ''
    };
  },
  mounted () {
    this.$EventBus.$off('search-article', this.searchArticle)
    this.$EventBus.$on('search-article', this.searchArticle)
  },

  watch: {
    columnId (newId) {

      if (newId.trim().length === 0) {
        return false
      }
      //如果columnId对应文章列表 存在缓存 articleList = 缓存数据
      if (this.columnArticleCache[newId]) {
        this.articleList = this.columnArticleCache[newId]
        return false
      }
      this.refreshing = true
      this.onRefresh()
    }
  },
  methods: {
    onLoad () {
      this.getArticles()
    },
    searchArticle (q) {
      this.q = q
      this.refreshing = true
      this.onRefresh()
    },
    onRefresh () {
      this.resetParams()
      this.onLoad()
    },
    resetParams () {
      this.page = 1
      this.finished = false
      this.loading = true
    },
    getQuery () {
      let column = this.columnId || undefined
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

      this.$api({ 'type': 'articles', data }).then(result => {
        if (this.refreshing) {
          this.articleList = [];
          this.refreshing = false;
        }
        if (this.articleList.length >= result.total) {
          //没有更多了
          this.finished = true
          return
        }
        this.articleList.push(...result.list)
        this.cacheColumnList()
        this.loading = false
        this.page++
      }).catch(err => err)
    },
    cacheColumnList () {
      if (this.columnId) {
        this.columnArticleCache[this.columnId] = JSON.parse(JSON.stringify(this.articleList))
      }
    }
  }
};
</script>
