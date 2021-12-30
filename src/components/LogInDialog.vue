<template>
  <div class="d-mask">
    <div class="dialog" @keypress.enter="onConfirm">
      <div class="content">
        <input type="text" class="i username" autofocus v-model="username" :placeholder="$t('home.dialog.username')" />
        <input type="password" class="i" v-model="password" :placeholder="$t('home.dialog.password')" />
        <div class="note">
          {{ $t('home.dialog.note') }}
        </div>
        <div class="btns">
          <div class="btn cancel" @click="onClose">
            {{ $t('home.dialog.cancel') }}
          </div>
          <div class="btn confirm" @click="onConfirm">
            {{ $t('home.dialog.confirm') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../request'
import { handleResult } from '../utils'

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    onClose () {
      this.password = ''
      this.username = ''
      this.$emit('close')
    },
    validate () {
      if (this.username.length < 2 || this.username.length > 10) return 1
      if (this.password.length < 6 || this.password.length > 18) return 2
      return true
    },
    async onConfirm () {
      const valid = this.validate()
      const u = {
        'en': 'The length of the username should be between 2 and 10~',
        'ja': 'ユーザー名の長さは2から10の間です〜',
        'zh_cn': '用户名长度在 2 到 10 之间喔~',
      }
      const p = {
        'en': 'The password length should be between 6 and 18~',
        'ja': 'パスワードの長さは6から18の間です〜',
        'zh_cn': '密码长度在 6 到 18 之间喔~',
      }
      const locale = this.$i18n.locale
      if (valid === 1) {
        this.$message.error(u[locale])
        return
      } else if (valid === 2) {
        this.$message.error(p[locale])
        return
      } else {
        const p = {
          password: this.password,
          username: this.username,
        }
        const { login } = api
        const res = await login(p)
        if (!handleResult(res)) return
        const { data } = res
        this.$store.commit('setUser', data.user)
        this.$store.commit('setToken', data.token)
        localStorage.setItem('token', data.token)
        this.$store.dispatch('fetchMessages')
        this.onClose()
      }
      
    },
  },
}
</script>

<style lang="scss" scoped>
.d-mask {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: transparent;
  .dialog {
    width: 570px;
    height: 400px;
    background-color: #212121;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 15px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    .content {
      display: flex;
      flex-direction: column;
      margin: 40px auto;
      width: 400px;
      height: 320px;
      justify-content: space-between;
      align-items: center;
      input {
        background: #1F1E1E;
        box-shadow: inset 0px 0px 15px 6px rgba(0, 0, 0, 0.25);
        border-radius: 10px;
        border: none;
        outline: none;
        width: 360px;
        height: 52px;
        font-size: 28px;
        padding: 10px 20px;
        box-sizing: border-box;
        line-height: 28px;
        text-align: center;
        color: $text-color;
        &::placeholder {
          font-size: 22px;
          line-height: 22px;
          color: rgba(229, 229, 229, 0.21);
        }
        &.username {
          margin-top: 30px;
        }
      }
      .note {
        width: 340px;
        color: rgba(229, 229, 229, 0.21);
        font-size: 14px;
        text-align: left;
        line-height: 20px;
      }
      .btns {
        display: flex;
        width: 360px;
        justify-content: space-between;
        align-items: center;
        .btn {
          cursor: pointer;
          width: 125px;
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
          &.cancel {
            background-color: #383838;
            /* color: #111111; */
            /* box-shadow: inset 2px 2px 8px 5px rgba(0, 0, 0, 0.5); */
            &:hover {
              background-color: #272727;
            }
            &:active {
              box-shadow: inset 2px 3px 5px 5px rgba(0, 0, 0, 0.4);
            }
          }
          &:hover {
            background: #1F1F1F;
          }
          &:active {
            box-shadow: inset 2px 4px 7px 5px rgba(0, 0, 0, 0.2);
          }
          /* &:hover {
            box-shadow: 4px 7px 7px 8px rgba(0, 0, 0, 0.2);
          } */
        }
      }
    }
  }
}

</style>