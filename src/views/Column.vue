<template>
  <div class="blog-column-words">
    <WordCloud :data="columnWords"
               nameKey="name"
               :fontSize="[80,120]"
               valueKey="value"
               :color="['#1f77b4', '#629fc9', '#94bedb', '#c9e0ef']"
               :showTooltip="false"
               :wordClick="wordClickHandler">
    </WordCloud>
    

  </div>
</template>

<script>
import WordCloud from 'vue-wordcloud'
export default {
  name: 'Column',
  components: { WordCloud },
  data () {
    return {
      columns: []
    };
  },
  created () {
    this.getColumns()
  },
  computed: {
    columnWords () {
      return this.columns.map(item => {
        return {
          name: item.name,
          value: item.aids.length || 0,
          id: item.id
        }
      })
    }
  },
  mounted () {
    this.$EventBus.$on('updateView', () => {
      this.getColumns()
    })
  },

  methods: {
    wordClickHandler (name) {
      let columnId = this.columns.find(item => {
        return item.name === name
      })?.id
      this.$router.push({ name: 'index', query: { columnId } })
    },
    async getColumns () {
      try {
        let columns = await this.$api({ type: 'columns' })
        this.columns = columns.list
      } catch (err) {
        console.log(err)
      }
    }
  },
};
</script>

<style lang="stylus">
.blog-column-words svg
  user-select none
  & text
    cursor pointer
</style>