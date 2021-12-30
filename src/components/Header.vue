<template>
  <div id="header">
    <div class="header-title">Happy New Year 2022</div>
    <div class="count-down" v-if="time>=0">
      <span v-if="day > 1"> {{ day }} {{ $t('home.countDown.day') }} </span>
      <span v-if="day == 1"> {{ day }} {{ $t('home.countDown.days') }} </span> &nbsp;
      <span class="pad"> {{ hour }} </span> : 
      <span class="pad"> {{ minute }} </span> : 
      <span class="pad"> {{ second }} </span>
    </div>
    <div class="options">
      <div class="item">
        <img class="icon" src="../assets/icon/msg.png" />
        <div class="label msg" @click="checkMessage">
          {{ $t('home.msg') }}
          <span class="news" v-if="news>0"> {{ news }} </span>
        </div>
      </div>
      <div class="item s2">
        <img class="icon" src="../assets/icon/lang.png" />
        <div class="selector">
          <div class="options">
            <div class="s-text">
              {{ $t('home.lang') }}
            </div>
            <div class="s-item" @click="setLanguage('zh_cn')">
              中文
            </div>
            <div class="s-item" @click="setLanguage('en')">
              English
            </div>
            <div class="s-item" @click="setLanguage('ja')">
              日本語
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <img class="icon" src="../assets/icon/me.png" />
        <div class="selector" :class="s1">
          <div class="options s3">
            <div class="s-text">
              {{ username ? username : $t('home.visitor') }}
            </div>
            <div v-if="!loggedIn" class="s-item" @click="showLogInDialog()">
              {{ $t('home.signIn') }}
            </div>
            <div v-else class="s-item" @click="signOut()">
              {{ $t('home.signOut') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <log-in-dialog v-if="dialogVisible" @close="closeLogInDialog"></log-in-dialog>
  </div>
</template>

<script>
import LogInDialog from './LogInDialog.vue'
import api from '../request'
import { formatDate } from '../utils'
import moment from 'moment'

export default {
  components: {
    LogInDialog,
  },
  data () {
    return {
      dialogVisible: false,
      s1: 'zh_cn',
      clock: null,
      // day: 0,
      // hour: 0,
      // minute: 0,
      // second: 0,
      time: 0,
    }
  },
  computed: {
    username () {
      return this.$store.getters.getUserName
    },
    news () {
      return this.$store.getters.getNews
    },
    loggedIn () {
      return Boolean(this.$store.getters.getUserName)
    },
    day () {
      return Math.floor(this.time / (3600 * 24))
    },
    hour () {
      let h = moment(this.time * 1000).hour()
      if (h < 10) h = '0' + h
      return h
    },
    minute () {
      let m = moment(this.time * 1000).minute()
      if (m < 10) m = '0' + m
      return m
    },
    second () {
      let s = moment(this.time * 1000).second()
      if (s < 10) s = '0' + s
      return s
    },
  },
  methods: {
    setLanguage (locale = 'en') {
      this.$i18n.locale = locale
      this.modifyStyle(locale)
      localStorage.setItem('locale', locale)
    },
    modifyStyle (locale) {
      locale = locale ? locale : this.$i18n.locale
      if (!this.loggedIn && locale == 'en') this.s1 = 'long'
      else this.s1 = 'short'
    },
    showLogInDialog () {
      this.dialogVisible = true
    },
    closeLogInDialog () {
      this.dialogVisible = false
      this.modifyStyle()
    },
    async checkMessage () {
      const { checkMessage: checkMessageAPI } = api
      const res = await checkMessageAPI()
      this.$store.commit('setNews', 0)
      this.$emit('checkMessage')
    },
    signOut () {
      this.$store.commit('setUser', null)
      this.$store.commit('setToken', null)
      localStorage.removeItem('token')
      this.modifyStyle()
      this.$router.go(0)
    },
    initClock (diff = 0) {
      if (diff <= 0) {
        clearInterval(this.clock)
        this.clock = null
        return
      }
      let time = diff
      this.clock = setInterval(() => {
        this.time = --time
        if (time <= 0) {
          clearInterval(this.clock)
          this.clock = null
          return
        }
        // this.day = Math.floor(time / (3600 * 24))
        // this.hour = moment(time * 1000).hour()
        // this.minute = moment(time * 1000).minute()
        // this.second = moment(time * 1000).second()
      }, 1000)
    },
  },
  mounted () {
    this.modifyStyle()
    const newYearTs = formatDate('2022-01-01 00:00:00').unix()
    const currentTs = moment().unix()
    const diff = newYearTs - currentTs
    if (diff > 0) this.initClock(diff)
  },
}
</script>

<style lang="scss" scoped>
#header {
  height: 68px;
  background-color: $header;
  /* position: fixed; */
  width: 100%;
  min-width: 1200px;
  /* top: 0; */
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  color: $text-color;
  .header-title {
    padding-left: 40px;
    font-size: 20px;
    font-weight: 500;
  }
  .count-down {
    margin-left: 20px;
    .pad {
      background: #e5e5e5;
      padding: 0 4px;
      border-radius: 5px;
      color: #212121;
      line-height: 26px;
      height: 24px;
      display: inline-block;
      box-sizing: border-box;
    }
  }
  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    .item {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0 15px;
      cursor: default;
      &.s2 {
        margin-right: 0;
        .icon {
          margin-right: 0;
        }
      }
      .icon {
        width: 26px;
        height: 26px;
        margin-right: 15px;
        position: relative;
        /* img {
          width: 26px;
          height: 26px;
        } */
      }
      .label {
        font-size: 24;
        line-height: 28px;
        height: 28px;
        &.msg {
          cursor: pointer;
          position: relative;
          .news {
            position: absolute;
            top: -6px;
            right: -13px;
            padding: 0px 2px;
            background: #c43e3e;
            color: #e5e5e5;
            border-radius: 5px;
            display: inline-block;
            text-align: center;
            line-height: 12px;
            font-size: 8px;
            opacity: 0.9;
            min-width: 10px;
            height: 14px;
          }
        }
      }
      .selector {
        display: flex;
        flex-direction: column;
        height: 40px;
        width: 90px;
        box-sizing: border-box;
        position: relative;
        transition: 0.1s;
        &.long {
          width: 190px;
        }
        &.short {
          width: 90px;
        }
        .s-text, .s-item {
          box-sizing: border-box;
          line-height: 40px;
          cursor: pointer;
          padding: 2px 5px;
          text-align: center;
          height: 40px;
          border-radius: 10px;
          width: 100%;
        }
        .s-item {
          background: #1e1e1e;
          box-shadow: 0px 4px 6px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 8px 7px rgba(0, 0, 0, 0.25);

        }
        .s-text {
          cursor: default;
        }
        .options {
          display: flex;
          top: 0;
          width: 100%;
          position: absolute;
          flex-direction: column;
          height: 40px;
          overflow: hidden;
          transition: 0.2s;
          z-index: 999;
          &:hover {
            height: 160px;
            .s-item {
              &:hover {
                background: #283625;
                color: #02B82A;
              }
            }
            /* .s-text {
              background: #1e1e1e;
            } */
          }
        }
        .s3 {
          &.options:hover {
            height: 80px;
          }
        }
      }
    }
  }
}
</style>