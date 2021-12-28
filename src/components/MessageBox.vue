<template>
  <div id="messageBox">
    <img class="cancel" src="../assets/icon/cancel.png" alt="" @click="closeMessageBox">
    <!-- <img src="../assets/ai.jpeg" alt=""> -->
    <div class="menu">
      <div class="item" :class="{ 'selected': selected === 1 }" @click="switchMenu(1)">
        {{ $t('message.menu.msg') }}
      </div>
      <div class="item" :class="{ 'selected': selected === 2 }" @click="switchMenu(2)">
        {{ $t('message.menu.feedback') }}
      </div>
    </div>
    <div class="main">
      <message-list v-if="selected === 1" />
      <feed-back-box v-if="selected === 2" />
    </div>
  </div>
</template>

<script>
import MessageList from './message/MessageList.vue'
import FeedBackBox from './message/FeedBackBox.vue'

export default {
  components: {
    MessageList,
    FeedBackBox,
  },
  data () {
    return {
      selected: 1,
    }
  },
  methods: {
    switchMenu (selected = 1) {
      this.selected = selected
    },
    checkMessage (show = true) {
      this.$emit('checkMessage', show)
    },
    closeMessageBox () {
      this.$emit('checkMessage', false)
    },
  },
}
</script>

<style lang="scss" scoped>
#messageBox {
  width: 70vw;
  min-width: 850px;
  height: 60vh;
  min-height: 600px;
  position: absolute;
  background: #101010;
  z-index: 1002;
  left: 50%;
  /* top: 0; */
    /* margin: 120px auto; */
  transform: translate(-50%, 0);
  box-shadow: 4px 4px 19px 11px rgba(143, 137, 137, 0.34);
  border-radius: 20px;
  color: $text-color;
  z-index: 1;
  display: flex;
  flex-direction: row;
  .cancel {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
  }
  /* background: url('../assets/ai.jpeg') no-repeat; */
  .menu {
    min-width: 180px;
    width: 15%;
    height: 100%;
    background: #111;
    box-shadow: 8px 0px 20px 8px rgba(0, 0, 0, 0.4);
    border-radius: 20px 0px 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .item {
      height: 60px;
      width: 100%;
      background: #181818;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 2px 2px 16px 9px rgba(0, 0, 0, 0.3);;
      border-radius: 5px;
      cursor: pointer;
      line-height: 60px;
      font-weight: 500;
      font-size: 19px;
      text-align: center;
      letter-spacing: 0.1rem;
      transition: 0.1s;
      &:hover {
        box-shadow: inset 2px 2px 16px 9px rgba(0, 0, 0, 0.6);
      }
      &.selected {
        color: $green;
        background: #101A0D;
        box-shadow: inset 2px 2px 16px 9px rgba(0, 0, 0, 0.6);
      }
    }
  }
  .main {
    width: 100%;
  }
  /* img {
    width: 80vw;
    min-width: 950px;
    height: 70vh;
    min-height: 660px;
    position: absolute;
    z-index: -1;
    border-radius: 20px;
    left: 0;
  } */
}
</style>