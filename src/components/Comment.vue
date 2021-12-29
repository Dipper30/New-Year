<template>
  <div class="comment">
    <div class="mask" v-if="isWriting" @click="hideInput" />
    <div class="content" @click="showInput">
      <span>{{ isRoot ? `` : ` - ` }} {{ user?.username || $t('home.anonymous') }}&nbsp;:  &nbsp;&nbsp; <span class="text"> {{ comment.content }} </span></span>
      <div class="input-box" v-if="isWriting" @keypress.enter="onReply">
        <input class="i" ref="input" type="text" v-model="reply" :placeholder="$t('home.reply')" />
        <div class="btn" @click="onReply"> {{ $t('home.replyBtn') }} </div>
      </div>
      
    </div>
    
    <div class="sub-comment" v-if="hasSub">
      <Comment v-for="comment of comment.children" :key="comment.id" :comment="comment" :gid="gid" :level="level+1">
      </Comment>
    </div>
  </div>
</template>

<script>
import api from '../request'
import { handleResult, isError } from '../utils'

export default {
  name: 'Comment',
  props: {
    comment: {
      default: null,
      type: Object,
    },
    gid: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 0,
    },
  },
  data () {
    return {
      isWriting: false,
      reply: '',
    }
  },
  computed: {
    user () {
      return this.comment?.User || null
    },
    hasSub () {
      return this.comment.children?.length > 0
    },
    isRoot () {
      return this.comment.root == 0
    },
  },
  methods: {
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
      const res = await makeComment({ content: this.reply, gid: this.gid, root: this.comment.id })
      if (isError(res)) return
      
      const { code, data } = res
      this.hideInput()
      this.$emit('resetGreeting', data[0])
    },
  },
  mounted () {
  },
}
</script>

<style lang="scss" scoped>
.comment {
  min-width: 800px;
  width: 66vw;
  margin: 0 auto;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 9;
    width: 100vw;
    height: 100vh;
  }
  .content {
    /* width: 100%; */
    text-align: left;
    color: $text-color;
    line-height: 18px;
    font-size: 13px;
    cursor: pointer;
    padding: 4px 5px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    &:hover {
      background: #242424;
      box-shadow: 2px 4px 8px 6px rgba(0, 0, 0, 0.25);
    }
    .text {
      color: rgba(229, 229, 229, 0.6);
    }
    
    .input-box {
      position: absolute;
      width: 100%;
      height: 60px;
      background: #1F1F1F;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      left: 4px;
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
  .sub-comment {
    margin-left: 30px;
  }
}

</style>