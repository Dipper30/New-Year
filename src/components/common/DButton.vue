<template>
  <div class="d-button" :class="t" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    t: {
      type: String,
      default: 'normal',
    },
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    },
  },
}
</script>

<style lang="scss">
.d-button {
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
</style>