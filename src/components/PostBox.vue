<template>
  <div class="post-box" @keypress.enter="onSubmit">
    <input type="text" v-model="content" :placeholder="$t('home.postGreeting')" >
    <div class="btn" @click="onSubmit">
      {{ $t('home.submit') }}
    </div>
    <el-checkbox class="hide" v-model="anonymous" :label="$t('home.anonymous')" border></el-checkbox>

  </div>
</template>

<script>
import api from '../request'
import { handleResult, isError } from '../utils'

export default {
  data () {
    return {
      content: '',
      anonymous: false,
      hideName: false,
    }
  },
  methods: {
    async onSubmit () {
      const { postGreeting } = api
      const res = await postGreeting({ content: this.content, anonymous: this.anonymous })
      if (!handleResult(res)) return
      this.anonymous = false
      const { data } = res
      this.content = ''
      this.$emit('postNewGreeting', data[0])
    },
  },
}
</script>

<style lang="scss"> 
.post-box {
  min-width: 900px;
  width: 74vw;
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  position: relative;
  input {
    color: #333;
    font-size: 26px;
    line-height: 60px;
    background: #D8D7D7;
    box-shadow: inset 0px 0px 16px 10px rgba(0, 0, 0, 0.4);
    border-radius: 10px 0px 0px 10px;
    border: none;
    outline: none;
    width: 80%;
    height: 60px;
    /* font-size: 22px; */
    box-sizing: border-box;
    /* line-height: 22px; */
    text-align: left;
    padding: 2px 25px;
    &::placeholder {
      font-size: 20px;
      line-height: 20px;
      color: rgba(49, 46, 46, 0.8);
    }
    &:focus {
      box-shadow: inset 0px 0px 20px 10px rgba(0, 0, 0, 0.6);
    }
  }
  .btn {
    cursor: pointer;
    width: 20%;
    height: 60px;
    color: $text-color;
    font-weight: 500;
    letter-spacing: 0.1rem;
    font-size: 22px;
    text-align: center;
    line-height: 60px;
    transition: 0.1s;
    background: #1F1F1F;
    border: 1px solid #222222;
    box-sizing: border-box;
    box-shadow: 6px 5px 20px 1px rgba(100, 100, 100, 0.3);
    border-radius: 0px 10px 10px 0px;
    position: relative;
    &:hover {
      /* background: #1F1F1F; */
      box-shadow: 6px 5px 13px 3px rgba(100, 100, 100, 0.6);
    }
    &:active {
      box-shadow: inset 4px 4px 9px 5px rgba(0, 0, 0, 0.5);
    }
  }
  .hide {
    position: absolute;
    right: -155px;
    top: 10px;
    background: #212121;
    border-color: $dark-green;
    color: #a4a4a4;
  }
  .el-checkbox.is-bordered.is-checked {
    border-color: $dark-green;
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: $green;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner {
    background-color: $dark-green;
    border-color: $dark-green;
  }
}
</style>