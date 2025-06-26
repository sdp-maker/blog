<template>
  <div>
    <el-form :model="form"
             ref="elForm">
             
      <el-form-item v-for="(item) in formData"
                    :key="item['query']"
                    :label="item.label"
                    label-width="100px"
                    :rules="validates[item['query']]"
                    :prop="item['query']">

        <el-upload v-if="item.type === 'avatar'"
                   class="avatar-uploader"
                   ref="upload"
                   :headers="{
      'Authorization': `Bearer ${$store.state.token}`,
    }"
                   :action="userFileAction"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :on-error="handleAvatarError"
                   :before-upload="beforeAvatarUpload">
          <el-image style="width: 100px; height: 100px"
                    v-if="form[item['query']]"
                    :src="form[item['query']]"
                    class="avatar"
                    fit="fit"></el-image>
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input v-if="['text','password'].includes(item.type)"
                  v-model="form[item['query']]"
                  :type="item.type"
                  :disabled="item.readonly"
                  :placeholder="item.placeholder"
                  :name="item['query']"
                  autocomplete="off"></el-input>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import FORM_DATA from '@/config/form.config'
import VALIDATE_DATE from '@/config/validate.config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  name: 'BaseForm',
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      form: {

      }
    };
  },

  created () {
    if (this.type === 'userInfo') {
      //筛选排除 vuex中userInfo里不存在 form.config['userInfo']中的项
      this.form = Object.fromEntries(Object.entries(this.$store.getters.userInfo).filter(([key]) => {
        return FORM_DATA['userInfo'].find(item => {
          return key == item['query']
        })
      }))
      // this.form = this.$store.getters.userInfo
    }
  },
  computed: {
    formData () {
      return FORM_DATA[this.type]
    },
    validates () {
      return VALIDATE_DATE
    },
    userFileAction () {
      return process.env.VUE_APP_USER_UPLOAD_PATH
    }
  },
  watch: {
    type () {
      this.initForm()
    }
  },
  methods: {
    initForm () {
      //重置表单字段 以及校验状态
      this.form = {}
      this.resetForm()
    },
    resetForm () {
      this.$refs['elForm'].resetFields()
    },
    handleAvatarSuccess (res) {
      this.form.avatar = res.data.fileURL
      NProgress.done()
    },
    handleAvatarError (err) {
      this.$notify.error({
        title: '上传失败',
        message: JSON.parse(err.message)?.message
      })
    },
    beforeAvatarUpload (file) {
      console.log(this.$refs)
      // 上传前 限制文件大小和文件类型
      let { size, type } = file

      let isPass = true

      isPass = /image/g.test(type)
      isPass = size < 5 * 1024 * 1024
      if (!isPass) {
        let errMsg = /image/g.test(type) ? "文件不得大于5M" : "请选择图片文件"
        this.$notify.error({
          title: '上传错误',
          message: errMsg
        })
        this.$refs.upload[0].abort(file)
        return false
      }
      NProgress.start()
    }
  },
};
</script>

<style lang="stylus" scoped>
.avatar-uploader .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden
.avatar-uploader .el-upload:hover
  border-color #409EFF
.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center
.avatar
  width 178px
  height 178px
  display block
</style>