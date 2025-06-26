<template>
  <div>
    <van-sticky :offset-top="45">
      <van-tabs v-model="columnType"
                @change="onChangeType">
        <van-tab v-for="tab in columnList"
                 :key="tab.id"
                 :title="tab.name"
                 :name="tab.id">
                 
        </van-tab>
      </van-tabs>
    </van-sticky>
    <ArticleList v-if="columnType"
                 :columnId="columnType" />
  </div>
</template>

<script>
import ArticleList from '@/mviews/ArticleList'
export default {
  name: 'Column',
  components: {
    ArticleList
  },
  data () {
    return {
      columnType: '',
      columnList: [],
    };
  },
  mounted () {
    this.getColumns()
  },

  methods: {
    onChangeType () {

    },
    async getColumns () {
      try {
        let result = await this.$api({ type: 'columns' })
        this.columnList = result.list
        this.columnType = this.columnList[0].id
      } catch (err) {
        return err
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>