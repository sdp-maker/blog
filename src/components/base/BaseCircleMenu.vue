<template>
  <transition-group tag="div"
                    class="blog-circle-menu"
                    appear
                    name="circle">
                    
    <el-button v-for="item in menuList"
               :key="item.icon"
               size="medium"
               class="blog-btn-menu"
               @click="clickMenu(item)"
               :icon="item.icon"
               circle></el-button>
    <el-button v-if="exceMenu"
               key="likes"
               size="medium"
               class="blog-btn-menu"
               :class="{active:isLike}"
               @click="handlerLikeArticle"
               :icon="exceMenu.icon"
               circle></el-button>

  </transition-group>
</template>

<script>
import MINXIN from '@/core/minxin'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('likes')
export default {
  name: 'BaseCircleMenu',
  mixins: [MINXIN],
  props: {
    circleMenuList: {
      type: Array
    }
  },
  data () {
    return {
    };
  },
  mounted () {

  },
  computed: {
    menuList () {
      return this.circleMenuList.filter(item => {
        return !item.exce
      })
    },
    exceMenu () {
      return this.circleMenuList.filter(item => {
        return item.exce
      })[0]
    },
    isLike () {
      let aid = this.$route.params.id
      return this.localLike(aid)
    },
    ...mapGetters({
      localLike: 'isLike'
    })
  },
  methods: {
    handlerLikeArticle () {
      //点击触发点赞 取消点赞
      let aid = this.$route.params.id
      this[this.isLike ? 'pullLike' : 'pushLike']({ aid })
      this.sendLikes({ aid })
    },
    handlerFocusTextarea () {
      //使当下 article => CommentTextArea => textarea DOM => focus()
      //没有属性关系 行为关系 传递一个信号(行为信号)
      this.$EventBus.$emit('focusTextarea')
    },
    addColumn () {
      //添加分类
      this.refreshModal('column')
    },
    clickMenu (menu) {
      let { route, handler } = menu
      if (route) {
        this.$router.push(route)
      }
      if (handler) {
        this[handler] && this[handler]()
      }

    },
    ...mapActions(['pullLike', 'pushLike', 'sendLikes'])
  },
};
</script>

<style lang="stylus" >
.blog-circle-menu
  display flex
  flex-direction column
  justify-content center
  align-items flex-end
.el-button--medium.blog-btn-menu
  width 60px
  height 60px
  font-size 28px
  &:active, &:focus
    background #FFF
    border 1px solid #fff
    color #606266
    outline 0
.el-button--medium.blog-btn-menu.active
  color #3a8ee6
  border-color #3a8ee6
.el-button--medium.blog-btn-menu + .el-button--medium.blog-btn-menu
  margin 10px 0
.circle-enter-active, .circle-leave-active
  transition transform 0.5s ease-in-out
.circle-enter
  transform translateX(-80px)
.circle-leave-to
  transform translateX(0)
</style>