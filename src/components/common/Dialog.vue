<template>
  <div>
    <div class="mask"></div>
    <div class="dialog">
      <img class="cancel-icon" src="../../assets/icon/cancel.png" alt="" @click="close">
      <div class="content">
        <slot />
      </div>
      <div class="btn-options">
        <d-button t="cancel" @onClick="onCancel">
          {{ $t('home.dialog.cancel') }}
        </d-button>
        <d-button @onClick="onConfirm">
          {{ $t('home.dialog.confirm') }}
        </d-button>
      </div>
      
    </div>
  </div>
  
</template>

<script>
import DButton from './DButton.vue'

export default {
  components: {
    DButton,
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    close () {
      this.$emit('cancel')
    },
    onConfirm () {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: transparent;
}
.dialog {
  position: absolute;
  height: 400px;
  width: 550px;
  left: 50%;
  top: 50%;
  background: red;
  transform: translate(-50%, -50%); 
  background: #101010;
  z-index: 1003;
  /* top: 0; */
    /* margin: 120px auto; */
  box-shadow: 4px 4px 19px 11px rgba(143, 137, 137, 0.34);
  border-radius: 20px;
  color: $text-color;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .cancel-icon {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    top: 5px;
    cursor: pointer;
  }
  .content {
    width: 80%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
  }
  .btn-options {
    margin: 20px 0 40px;
    display: flex;
    width: 80%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: $text-color;
  }
}
</style>