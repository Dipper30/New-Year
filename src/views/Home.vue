<template>
  <div class="home">
    <Header @checkMessage="checkMessage" />
    <div id="main">
      <img src="../assets/bg.jpg" alt="bg" id="bg">
      <message-box v-if="showMessages" @checkMessage="checkMessage"></message-box>
      <div class="count">
        <span> {{ $t('home.total', { total: len }) }} </span>
      </div>
      <wish-board ref="board" @changeCount="changeCount" />
      <post-box @postNewGreeting="postNewGreeting"></post-box>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import WishBoard from '../components/WishBoard.vue'
import PostBox from '../components/PostBox.vue'
import MessageBox from '../components/MessageBox.vue'

export default {
  name: 'Home',
  components: {
    Header,
    WishBoard,
    PostBox,
    MessageBox,
  },
  data () {
    return {
      len: 0,
      showMessages: false,
    }
  },
  methods: {
    postNewGreeting (newGreeting) {
      this.$refs.board.pushNewGreeting(newGreeting)
    },
    changeCount (newGreeting) {
      this.len = newGreeting.length
      console.log(newGreeting.length)
    },
    checkMessage (show = true) {
      this.showMessages = show
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0;
  #main {
    /* margin-top: 68px; */
    width: 100%;
    min-width: 1200px;
    /* height: 100%; */
    height: calc(100% - 68px);
    min-height: 680px;
    padding-top: 40px;
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
    .count {
      color: $text-color;
      padding: 4px 4px 10px;
      text-align: left;
      width: 74vw;
      min-width: 900px;
      margin: 0 auto;
      span {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>