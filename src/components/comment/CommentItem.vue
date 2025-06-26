<!--
 * @Author: sdp-maker 19179977082@163.com
 * @Date: 2025-06-05 13:48:27
 * @LastEditors: sdp-maker 19179977082@163.com
 * @LastEditTime: 2025-06-25 12:44:32
 * @FilePath: \vue-blog\src\components\comment\CommentItem.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <li class="blog-comment--item">
    <div class="blog-comment--user blog-line blog-line--row ">
      
      <div class="blog-comment--avatar">
        <img :src="uid.avatar"
             alt="!">
      </div>
      <span class="blog-comment--name">{{uid.nikname}}</span>
    </div>
    <p class="blog-comment-content">{{content}}</p>
    <p class="blog-comment-date">{{date}}</p>
  </li>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    uid: {
      type: Object
    },
    content: {
      type: String
    },
    date: {
      type: String
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
};
</script>

<style lang="scss" scoped>
</style>