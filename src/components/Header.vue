<template>
  <div id="header">
    <div class="header-title">Happy New Year 2022</div>
    <div class="options">
      <div class="item">
        <img class="icon" src="../assets/icon/msg.png" />
        <div class="label msg">
          {{ $t('home.msg') }}
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
            <div class="s-item" @click="showLogInDialog()">
              {{ $t('home.signIn') }}
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

export default {
  components: {
    LogInDialog,
  },
  data () {
    return {
      dialogVisible: false,
      s1: 'zh_cn',
    }
  },
  computed: {
    username () {
      return this.$store.getters.getUserName
    },
  },
  methods: {
    setLanguage (locale = 'en') {
      this.$i18n.locale = locale
      this.s1 = this.$i18n.locale
      localStorage.setItem('locale', locale)
    },
    showLogInDialog () {
      this.dialogVisible = true
    },
    closeLogInDialog () {
      this.dialogVisible = false
    },
  },
  mounted () {
    this.s1 = this.$i18n.locale
    console.log(this.s1)
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
  justify-content: space-between;
  align-items: center;
  color: $text-color;
  .options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
        
      }
      .label {
        font-size: 24;
        line-height: 28px;
        height: 28px;
        &.msg {
          cursor: pointer
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
        &.en {
          width: 190px;
        }
        &.zh_cn {
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