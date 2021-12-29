<template>
  <div class="wish">
    <div class="mask" v-if="isWriting" @click="hideInput" />
    <div class="post" @click="showInput">
      <div class="content">
        <span>
          {{ wish.content }}
        </span>
      </div>
      <div class="name">
        <div class="quote" />
        <span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ user?.username || $t('home.anonymous') }} </span>
      </div>
      <div class="input-box" v-if="isWriting" @keypress.enter="onReply">
        <input class="i" ref="input" type="text" v-model="reply" :placeholder="$t('home.reply')" />
        <div class="btn" @click="onReply"> {{ $t('home.replyBtn') }} </div>
      </div>
    </div>
    
    <div class="desc">
      <div class="time">
        {{ $t('home.publish') }} &nbsp; {{ uploadTime }}
      </div>
      <div class="options">
        <div class="item">
          <img v-if="!wish.liked" src="../assets/icon/like.png" alt="" @click="onLike">
          <img v-else src="../assets/icon/liked.png" alt="" @click="onLike">
          <span> {{ wish.likesCount }} </span>
        </div>
        <div class="item">
          <img src="../assets/icon/comment.png" alt="">
          <span> {{ wish.commentsCount }} </span>
        </div>
        <div class="item">
          <el-tooltip
            class="item"
            effect="dark"
            :content="$t('home.report')"
            placement="top"
          >
            <img v-if="!wish.reported" src="../assets/icon/report.png" alt="" @click="onReport">
            <img v-else src="../assets/icon/reported.png" alt="" @click="onReport">
          </el-tooltip>
          
          <span> {{ wish.reportsCount }} </span>
        </div>
      </div>
    </div>
    <div class="comment-list">
      <Comment v-for="comment of comments" :key="comment.id" :comment="comment" :gid="wish.id" :level="Number(0)" @resetGreeting="resetGreeting" />
    </div>
  </div>
  
</template>

<script>
import Comment from './Comment.vue'
import { formatTS, handleResult } from '../utils'
import api from '../request'

export default {
  props: {
    wish: {
      type: Object,
      default: null,
    },
  },
  components: {
    Comment,
  },
  data () {
    return {
      isWriting: false,
      reply: '',
    }
  },
  computed: {
    comments () {
      return this.wish.Comments
    },
    user () {
      return this.wish?.User || null
    },
    uploadTime () {
      return formatTS(this.wish.uploadedAt, 'YYYY-MM-DD HH:mm')
    },
  },
  methods: {
    resetGreeting (newGreeting) {
      this.$emit('resetGreeting', newGreeting)
    },
    async onLike () {
      const { likeGreeting } = api
      let res = false
      if (this.wish.liked) {
        // 取消report
        res = await likeGreeting({ gid: this.wish.id, negative: true })
      } else {
        // report
        res = await likeGreeting({ gid: this.wish.id })
      }
      if (!handleResult(res, false)) return
      const newGreeting = res.data
      this.resetGreeting(newGreeting[0])
    },
    async onReport () {
      const { reportGreeting } = api
      let res = false
      if (this.wish.reported) {
        // 取消report
        res = await reportGreeting({ gid: this.wish.id, negative: true })
      } else {
        // report
        res = await reportGreeting({ gid: this.wish.id })
      }
      if (!handleResult(res, false)) return
      const newGreeting = res.data
      this.resetGreeting(newGreeting[0])
    },
    inputComment () {

    },
    showInput () {
      this.isWriting = true
      this.$nextTick(() => {
        const eles = document.getElementsByClassName('input-box')
        const ele = eles ? eles[0] || null : null
        if (!ele) return
        ele.style.left = `${-(30 * this.level)}px`
        this.$refs['input'].focus()
      })
    },
    hideInput () {
      this.reply = ''
      this.isWriting = false
    },
    async onReply () {
      if (this.reply.length < 1 || this.reply.length > 50) {
        const m = {
          'en': 'Replies should be no more than 50 words and no less than 1 word.',
          'ja': '返信の長さは1〜50語です',
          'zh_cn': '回复长度在 1 ~ 50 字之间喔~',
        }
        const locale = this.$i18n.locale
        this.$message({
          message: `${m[locale]}`,
          type: 'error',
        })
        return
      }
      const { makeComment } = api
      const res = await makeComment({ content: this.reply, gid: this.wish.id, root: 0 })
      if (!handleResult(res, false)) return
      
      const { code, data } = res
      this.hideInput()
      this.$emit('resetGreeting', data[0])
    },
  },
  mounted () {
    console.log(this.wish)
  },
}
</script>

<style lang="scss" scoped>
.wish {
  margin-bottom: 15px;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 9;
    width: 100vw;
    height: 100vh;
  }
  .post {
    min-width: 800px;
    width: 66vw;
    /* height: 100px; */
    margin: 0 auto;
    background: #1C1B1B;
    box-shadow: inset 0px 0px 14px 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: $text-color;
    font-size: 16px;
    letter-spacing: 3px;
    margin-bottom: 8px;
    position: relative;
    &:hover {
      cursor: pointer;
      background:rgba(16, 26, 13, 0.25);
    }
    .content {
      padding: 20px;
      /* width: 84%; */
      /* min-width: 675px; */
      width: max-content;
      text-align: left;
      letter-spacing: 0.1em;
    }
    .name {
      padding: 10px;
      width: 16%;
      min-width: 125px;
      position: relative;
      font-weight: 600;
      letter-spacing: 0.1rem;
      font-size: 20px;
      word-break: break-all;
      .quote {
        position: absolute;
        height: 2px;
        width: 30px;
        background-color: #e5e5e5;
        top: 20px;
        left: 10px;
        word-break: break-all;
      }
    }
    .input-box {
      position: absolute;
      min-width: 800px;
      width: 66vw;
      height: 60px;
      background: #1F1F1F;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      /* left: 4px; */
      top: 70px;
      border-radius: 20px;
      box-shadow: 0px 0px 20px 6px rgba(2,184,42,0.15);
      z-index: 10;
      input {
        background: #1F1E1E;
        box-shadow: inset 0px 0px 15px 6px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        border: none;
        outline: none;
        width: 80%;
        height: 44px;
        font-size: 22px;
        box-sizing: border-box;
        line-height: 22px;
        text-align: left;
        padding: 2px 25px;
        color: $text-color;
        &::placeholder {
          font-size: 20px;
          line-height: 20px;
          color: rgba(229, 229, 229, 0.21);
        }
      }
      .btn {
        cursor: pointer;
        width: 100px;
        height: 36px;
        background: #2D2C2C;
        border-radius: 5px;
        color: $text-color;
        font-weight: 400;
        font-size: 18px;
        text-align: center;
        line-height: 36px;
        transition: 0.1s;
        box-shadow: 2px 4px 7px 5px rgba(0, 0, 0, 0.2);
        &:hover {
          background: #1F1F1F;
        }
        &:active {
          box-shadow: inset 2px 4px 7px 5px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
  .desc {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: $text-color;
    min-width: 800px;
    width: 66vw;
    font-size: 12px;
    padding: 3px 4px 6px 4px;
    box-sizing: border-box;
    /* height: 100px; */
    margin: 0 auto;
    .options {
      width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .item {
        display: flex;
        flex-direction: row;
        width: 80px;
        justify-content: flex-end;
        img {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
        span {
          cursor: default;
          padding-left: 10px;
          line-height: 20px;
          font-size: 14px;
          width: 16px;
        }

      }
    }
  }
}

</style>