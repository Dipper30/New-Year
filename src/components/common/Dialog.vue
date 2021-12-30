<template>
  <div>
    <div class="d-mask"></div>
    <div class="d-dialog">
      <img class="cancel-icon" src="../../assets/icon/cancel.png" alt="" @click="close">
      <div class="d-content" :class="{'full': !showButtons}">
        <slot />
      </div>
      <div class="d-btn-options" v-if="showButtons">
        <d-button t="cancel" @onClick="onCancel">
          {{ cancelText }}
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
  props: {
    showButtons: {
      default: true,
      type: Boolean,
    },
    cancel: {
      default: '',
      type: String,
    },
  },
  components: {
    DButton,
  },
  computed: {
    cancelText () {
      return this.cancel ? this.cancel : this.$t('home.dialog.cancel')
    },
  },
  methods: {
    onCancel () {
      this.$emit('cancel')
    },
    close () {
      this.$emit('close')
    },
    onConfirm () {
      this.$emit('confirm')
    },
  },
}
</script>

<style lang="scss" scoped>
.d-mask {
  position: fixed;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  top: 0;
  background: transparent;
}
.d-dialog {
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
  .d-content {
    width: 80%;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70%;
    &.full {
      height: 100%;
    }
  }
  .d-btn-options {
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