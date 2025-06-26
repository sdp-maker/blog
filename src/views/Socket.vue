<template>
  <div class="blog-chat">
    <div class="blog-chat--content">
      <div class="blog-chat--item"
           :class="chat.dis"
           v-for="chat in chatList"
           :key="chat.id">
           

        <span v-if="chat.nikname"
              class="blog-chat--nikname">{{chat.nikname}}</span>
        <div :class="[chat.type === 'action'&&'notif','blog-chat--box']">
          <span class="blog-chat--time"
                v-if="chat.time">{{chat.time}}</span>
          <p class="blog-chat--msg"
             v-if="chat.msg">{{chat.msg}}</p>
        </div>
      </div>
    </div>
    <div class="blog-chat--bottom">
      <el-input v-model="sendMsg"
                placeholder="请输入内容"
                @keydown.native.enter="sendChat"></el-input>
      <el-button type="primary"
                 @click="sendChat">发送消息</el-button>

    </div>

    <el-dialog title="欢迎聊天"
               :visible.sync="dialogVisible"
               width="30%">
      输入昵称:
      <el-input v-model="nikname"> </el-input>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="enterChat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

import formatDate from '@/util/formatDate'
import { io } from 'socket.io-client'
let idx = 0
export default {
  name: 'Socket',
  data () {
    return {
      sendMsg: '',
      chatList: [],
      nikname: '',
      uid: '',
      ws: null,
      dialogVisible: true
    };
  },
  created () {
    this.$store.commit('RIGHT_LIVE2D_DIS')

    if (this.$ws) {
      this.ws = this.$ws
      this.getUserInfo()
      this.ws.emit('enterChat', { uid: this.uid, nikname: this.nikname })
      this.dialogVisible = false
    } else {
      this.ws = io(process.env.VUE_APP_USER_CHAT_PATH, { transports: ['websocket'] })
    }


    this.ws.on('chat', (data) => {
      this.serverChat(data)
    })
    this.ws.on('logout', (nikname) => {
      this.serverLog({ nikname, isLogin: false })
    })
    this.ws.on('logged', (nikname) => {
      this.serverLog({ nikname, isLogin: true })
    })
  },
  beforeDestroy () {
    this.$store.commit('LEFT_LIVE2D_DIS')
    //关闭socket
    this.ws.emit('leaveChat')
  },
  methods: {
    getUserInfo () {
      let { nikname, _id } = this.$store.getters.userInfo
      this.nikname = nikname
      this.uid = _id
    },
    enterChat () {
      this.ws.emit('enterChat', { nikname: this.nikname })
      this.dialogVisible = false
    },
    addChat ({ type = "msg",
      msg = "",
      nikname = '',
      time = formatDate(),
      isMe = false }) {
      let dis = 'left'
      if (type === 'action') {
        dis = 'center'
      }
      if (isMe) {
        dis = 'right'
      }
      this.chatList.push({
        type, msg, nikname, time, isMe, dis, id: ++idx
      })
    },
    sendChat () {
      let msg = this.sendMsg
      this.addChat({
        isMe: true,
        msg,
        nikname: this.nikname
      })
      this.ws.emit('send', msg)
      this.sendMsg = ''
    },
    serverChat ({ msg = '', nikname = "陌生人", time = "" }) {
      this.addChat({
        nikname, msg, time
      })
    },
    serverLog ({ nikname, isLogin }) {
      let state = isLogin ? '进入' : '离开'
      let msg = `${nikname} ${state}了聊天室`
      this.addChat({
        type: 'action', msg
      })
    },
    submitEditor () {
      this.ws.emit('send', this.sendMsg)
    }
  },
};
</script>

<style lang="stylus" >
.blog-chat
  display flex
  flex-direction column
  justify-content space-between
  width 90%
  height 80vh
  padding 20px 0 0
  background-color rgba(255, 255, 255, 0.2)
  box-shadow 0 0 30px rgba(122, 122, 122, 0.8) inset
  border-radius 22px 22px 0 0
.blog-chat--content
  padding 0 15px
.blog-chat--item
  display flex
  flex-direction row
  justify-content center
.blog-chat--item.left
  justify-content flex-start
.blog-chat--item.right
  justify-content flex-start
  flex-direction row-reverse
.blog-chat--box
  display flex
  flex-direction column
  margin 25px
  padding 12px
  background-color #fff
  border-radius 8px
.blog-chat--nikname
  flex 0 0 auto
.blog-chat--time
  font-size 12px
.blog-chat--msg
  padding 6px 0 0
  line-height 1.5
  font-size 14px
.blog-chat--notif
  width 50%
  display flex
  align-items center
  justify-content space-around
  line-height 20px
.blog-chat--bottom
  display flex
  background-color #888
  padding 20px 10px
</style>