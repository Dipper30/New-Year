<template>
  <div class="feedback-box">
    <input type="richtext" v-model="content" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: '',
    }
  },
  methods: {
    onSubmit () {

    },
  },
}
</script>

<style lang="scss" scoped>
.feedback-box {
  input {
    width: 70%;
    min-width: 550px;
    max-width: 800px;
    background: #1F1F1F;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    left: 4px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px 6px rgba(2,184,42,0.15), inset 2px 4px 8px 6px rgba(0, 0, 0, 0.2);;
    z-index: 10;
    line-height: 50px;
    padding: 5px 20px;
    font-size: 20px;
    outline: none;
    border: none;
    &::placeholder {
      font-size: 20px;
      line-height: 20px;
      color: rgba(49, 46, 46, 0.8);
      /* color: rgba(229, 229, 229, 0.21); */
    }
    &:focus {
      box-shadow: inset 2px 4px 10px 8px rgba(0, 0, 0, 0.7);
    }
  }
}
</style>