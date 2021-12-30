<template>
  <div class="comment">
    <div class="mask" v-if="isWriting" @click="hideInput" />
    <div class="content" :class="{'showContent': !contentRemoved}" @click="showInput">
      <span>{{ isRoot ? `` : ` - ` }} {{ user?.username || $t('home.anonymous') }}&nbsp;:  &nbsp;&nbsp;
        <span class="text" v-if="!contentRemoved"> {{ comment.content }}</span>
        <span class="text removed" v-else> {{ $t('home.commentRemoved') }}</span>
        &nbsp;&nbsp;<span class="delete" v-if="isAuthor" @click.stop="deleteComment" />
      </span>
      
      <div class="input-box" v-if="!contentRemoved && isWriting" @keypress.enter="onReply">
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
import { mapGetters } from 'vuex'
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
    ...mapGetters(['getUserID']),
    user () {
      return this.comment?.User || null
    },
    hasSub () {
      return this.comment.children?.length > 0
    },
    isRoot () {
      return this.comment.root == 0
    },
    contentRemoved () {
      return !this.comment?.visible
    },
    isAuthor () {
      return !this.contentRemoved && this.comment.User.id == this.getUserID
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
    async deleteComment () {
      const { deleteComment: deleteCommentAPI } = api
      const p = {
        cid: this.comment.id,
        gid: this.gid,
      }
      const res = await deleteCommentAPI(p)
      if (!handleResult(res)) return
      const { data } = res
      this.$emit('resetGreeting', data[0])
    },
  },
  mounted () {
    // console.log('uid', this.getUserID)
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
    cursor: default;
    padding: 4px 5px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;
    &.showContent:hover {
      background: #242424;
      cursor: pointer;
      box-shadow: 2px 4px 8px 6px rgba(0, 0, 0, 0.25);
    }
    .text {
      color: rgba(229, 229, 229, 0.6);
      &.removed {
        /* color: rgba(229, 229, 229, 0.4); */
        color: #676767;
      }
    }
    .delete {
      width: 18px;
      height: 18px;
      background: url('../assets/icon/delete.png') no-repeat;
      background-size: contain;
      display: inline-block;
      transform: translateY(4px);
      cursor: pointer;
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