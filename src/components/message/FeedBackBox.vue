<template>
  <div class="feedback-box">
    <div class="title">
      <div class="text"> {{ $t('message.feedback.type') }}: </div>
      <div class="selector">
        <div class="type" @click="selectTitle('1')" :class="{'selected': selectedTitle == 1}">
        {{ $t('message.feedback.proposal') }}
        </div>
        <div class="type" @click="selectTitle('2')" :class="{'selected': selectedTitle == 2}">
          {{ $t('message.feedback.bug') }}
        </div>
        <div class="type" @click="selectTitle('3')" :class="{'selected': selectedTitle == 3}">
          {{ $t('message.feedback.coop') }}
        </div>
      </div>
    </div>
    <input type="text" v-model="content" :placeholder="$t('message.feedback.pl')" />
    <div class="btn" @click="onSubmit"> {{ $t('home.submit') }} </div>
  </div>
</template>

<script>
import api from '../../request'

export default {
  data () {
    return {
      lock: false,
      content: '',
      selectedTitle: '1',
    }
  },
  methods: {
    selectTitle (t = '1') {
      this.selectedTitle = t
    },
    clear () {
      this.selectedTitle = '1'
      this.content = ''
    },
    async onSubmit () {
      if (this.lock == true) return
      this.lock = true
      const { postFeedback } = api
      const p = {
        content: this.content,
        title: this.selectedTitle,
      }
      const { code, msg } = await postFeedback(p)
      this.lock = false
      if (code != 10002 || code != 200 || code !=201) {
        this.$message.error(this.$t('message.feedback.notify_error') + '  msg: ' + msg)
      } else {
        this.clear()
        this.$message.error(this.$t('message.feedback.notify_error'))
      }
      // console.log(this.selectedTitle, this.content)
    },
  },
}
</script>

<style lang="scss" scoped>
.feedback-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  .title, input {
    width: 70%;
    min-width: 550px;
    max-width: 800px;
  }
  .title {
    .text {
      text-align: left;
      margin-bottom: 30px;
    }
    .selector {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .type {
        width: 120px;
        /* background: #333; */
        cursor: pointer;
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
        padding: 4px 8px;
        &:hover {
          background: #1F1F1F;
        }
        &:active {
          box-shadow: inset 2px 4px 7px 5px rgba(0, 0, 0, 0.2);
        }
        &.selected {
          color: $green;
          background: $dark-green;
          box-shadow: inset 2px 4px 7px 5px rgba(0, 0, 0, 0.8);
        }
      } 
    }
  }
  input {
    background: #1F1F1F;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    left: 4px;
    border-radius: 20px;
    z-index: 10;
    line-height: 50px;
    padding: 5px 20px;
    font-size: 20px;
    outline: none;
    border: none;
    box-shadow: inset 2px 4px 10px 8px rgba(0, 0, 0, 0.7);
    color: $text-color;
    &::placeholder {
      font-size: 20px;
      line-height: 20px;
      color: rgba(229, 229, 229, 0.21);
      /* color: rgba(229, 229, 229, 0.21); */
    }
    &:focus {
      box-shadow: 0px 0px 14px 4px rgba(2,184,42,0.1), inset 2px 4px 8px 6px rgba(0, 0, 0, 0.6);
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
</style>