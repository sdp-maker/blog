<template>
  <transition enter-active-class="animate__animated animate__fadeIn"
              appear
              
              mode="out-in">
    <el-card class="blog-editor">
      <h3 class="blog-editor-title">标题</h3>
      <el-input ref="title"
                v-model="title"
                class="blog-editor-input"
                size="medium"
                placeholder="文章标题"></el-input>

      <h3 class="blog-editor-title">内容</h3>
      <div id="blog-editor-textarea">

      </div>
      <div class="blog-editor-tags">
        <h3 class="blog-editor-title">分类选择</h3>
        <el-radio-group v-model="column">
          <el-radio-button v-for="(item) in columns"
                           :key="item.id"
                           :label="item.id">{{item.name}}</el-radio-button>
        </el-radio-group>
      </div>

      <div class="blog-editor-button">
        <el-button type="primary"
                   @click="submitEditor">提交</el-button>
        <el-button type="primary"
                   @click="cancelEditor">重置</el-button>
      </div>

    </el-card>

  </transition>
</template>

<script>
import wangEditor from 'wangeditor'
export default {
  name: 'Editor',
  props: {
    columnId: {
      type: String
    }
  },
  data () {
    return {
      editor: null,
      title: '',
      content: '',
      columns: [],
      column: '',
    };
  },
  created () {
    this.getColumns()

  },
  mounted () {
    const editor = new wangEditor(`#blog-editor-textarea`)

    editor.config.onchange = (newHtml) => {
      this.content = newHtml
    }
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_UPLOAD_PATH
    editor.config.uploadImgMaxSize = 5 * 1024 * 1024  // 5M
    editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    editor.config.uploadImgMaxLength = 5
    editor.config.uploadFileName = 'file'
    editor.config.uploadImgHeaders = {
      'Authorization': `Bearer ${this.$store.state.token}`,
    }
    editor.create()
    this.editor = editor
  },
  methods: {
    async getColumns () {
      try {
        let columns = await this.$api({ type: 'columns' })
        this.columns = columns.list.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
        //如果props传递columnId 就选中
        if (this.columnId) {
          this.column = this.columnId
          return
        }
        //如果没有props 传递columnId 就选中第一项
        this.column = this.columns[0].id
      } catch (err) {
        console.log(err)
      }
    },
    submitEditor () {
      // 通过代码获取编辑器内容
      // let content = this.editor.txt.html()
      if (!this.validateEditor()) {
        return
      }
      this.postEditorData()

    },
    cancelEditor () {
      this.editor.txt.clear()
    },
    validateEditor () {
      if (this.title.trim().length === 0) {
        this.$notify.error({
          title: '错误',
          message: '请填写标题'
        })
        this.$refs.title.focus()
        return false
      }
      if (this.content.trim().length === 0) {
        this.$notify.error({
          title: '错误',
          message: '内容不能为空'
        })
        return false
      }
      return true
    },
    async postEditorData () {
      let postData = {
        title: this.title,
        content: this.content,
        //TODO 封装column
        column: this.column,
        cover: this.content.match(/<img src="([^"']*)"/)?.[1] || undefined
      }

      try {
        this.$api({
          type: 'postArticle', data: JSON.parse(JSON.stringify(postData))
        })
        this.$notify.success({
          title: '成功',
          message: '文章提交成功'
        })
        this.$router.push('/index')
      } catch (err) {
        this.$notify.error({
          title: '错误',
          message: '提交失败'
        })
      }

    }
  },
  beforeDestroy () {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy()
    this.editor = null
  }
};
</script>

<style lang="stylus" >
.blog-editor-title
  padding 12px 0
  font-size 16px
.el-input--medium.blog-editor-input
  font-size 18px
  line-height 38px
  height 38px
.blog-editor-tags
  margin 20px 0
  & .el-tag+.el-tag
    margin-left 12px
.blog-editor-button
  padding-top 20px
  display flex
  justify-content space-around
  & button
    flex 1
    line-height 22px
    font-size 18px
</style>