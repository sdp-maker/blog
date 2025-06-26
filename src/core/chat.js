import { io } from 'socket.io-client'
const CHAT_PATH = process.env.VUE_APP_USER_CHAT_PATH


/*
 serverEvent
  logout 登出 nikname
  logged 登入 nikname
  chat 聊天信息广播
     {
      name: 用户名,
      msg: 信息,
      time: 时间
    }

 clientEvent
  login 登录 nikname
  disconnect 退出 
  send 发送消息 msg
    

  {
    nikename,type:'msg|action',dis:'left|right',time:''
  }

  昵称:  日期 + msg 
                               信息 + 日期  昵称

  ---------------- 昵称 登出|登入 -----------
*/


export default class Chat {
  constructor({ url = CHAT_PATH }) {
    this.server = io(url, { transports: ['websocket'] })
    this.msgList = []
  }

  logout () {
    this.server.on('logout', (nikname) => {

    })
  }
  logged () {

  }
  chat () {

  }

  clientEventAgent () {
    return {

    }
  }
  login () { }
  disconnect () { }
  send () { }
}