<template>
  <div class="home">
    <Header @checkMessage="checkMessage" />
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('home.activity.luck')"
      placement="top"
    >
      <div id="wishLogo" @click="testLuck">
        <img class="logo" src="../assets/logo-wish.png" alt="">
      </div>
    </el-tooltip>
    
    <div id="main">
      <img src="../assets/bg.jpg" alt="bg" id="bg">
      <message-box v-if="showMessages" @checkMessage="checkMessage"></message-box>
      <div class="up-bar">
        <div> <span> {{ $t('home.total', { total: len }) }} </span> </div>
        <img class="refresh" src="../assets/icon/refresh.png" alt="" @click="fetchGreetings">
      </div>
      <wish-board ref="board" @changeCount="changeCount" />
      <post-box @postNewGreeting="postNewGreeting"></post-box>
    </div>
    <luck-dialog
      v-if="showLuckDialog"
      @cancel="testLuck(false)"
      @confirm="testLuck(true)"  
    />
  </div>

</template>

<script>
import Header from '../components/Header.vue'
import WishBoard from '../components/WishBoard.vue'
import PostBox from '../components/PostBox.vue'
import MessageBox from '../components/MessageBox.vue'
import LuckDialog from '../components/LuckDialog.vue'

export default {
  name: 'Home',
  components: {
    Header,
    WishBoard,
    PostBox,
    MessageBox,
    LuckDialog,
  },
  data () {
    return {
      len: 0,
      showMessages: false,
      showLuckDialog: false,
      lock: false,
    }
  },
  methods: {
    postNewGreeting (newGreeting) {
      this.$refs.board.pushNewGreeting(newGreeting)
    },
    changeCount (newGreeting) {
      this.len = newGreeting.length
    },
    checkMessage (show = true) {
      this.showMessages = show
    },
    fetchGreetings () {
      if (this.lock) return
      this.$refs.board.fetchGreetings()
      setTimeout(() => {
        this.lock = false
      }, 3000)
      
    },
    testLuck (open = true) {
      if (open && !this.$store.getters.getUser) {
        const locale = this.$i18n.locale
        const m = {
          'en': 'Please sign in first.',
          'ja': 'まだログインしていません',
          'zh_cn': '你还没有登录喔~',
        }
        this.$message.warning(m[locale])
        return
      }
      this.showLuckDialog = open
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  #wishLogo {
    cursor: pointer;
    position: absolute;
    top: 300px;
    width: 66px;
    height: 66px;
    z-index: 998;
    right: 15px;
    animation-duration: 1s;
    animation-name: swing;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    transition: ease-in;
    .logo {
      width: 66px;
      height: 66px;
    }
    &::after {
      content: '';
      width: 66px;
      height: 66px;
      display: inline-block;
      position: absolute;
      background: url('../assets/logo-wish.png') no-repeat;
      background-size: contain;
      left: 7px;
      top: 6px;
      z-index: -1;
      opacity: 0.4;
    }
  }
  @keyframes swing {
    /* 0% {
      top: 300px;
      right: 10px;
    }
    25% {
      top: 295px;
      right: 10px;
    } */
    from {
      top: 295px;
      /* right: 10px; */
    }
    /* 75% {
      top: 300px;
      right: 15px;
    } */
    to {
      top: 302px;
      /* right: 10px; */
    }
  }
  #main {
    /* margin-top: 68px; */
    width: 100%;
    min-width: 1200px;
    /* height: 100%; */
    height: calc(100% - 68px);
    min-height: 680px;
    /* padding-top: 40px; */
    #bg {
      width: 100%;
      height: 100%;
      min-height: 760px;
      min-width: 1200px;
      position: absolute;
      left: 0;
      top: 68px;
      z-index: -1;
    }
    .up-bar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 74vw;
      min-width: 900px;
      margin: 0 auto;
      color: $text-color;
      padding: 30px 4px 5px;
      box-sizing: border-box;
      .count {
        padding: 30px 4px 10px;
        text-align: left;
        width: 100px;
        margin: 0 auto;
        span {
          background-color: rgba(0, 0, 0, 0.7);
        }
      }
      .refresh {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
    }
    
  }
}
</style>