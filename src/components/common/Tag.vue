<template>
  <span class="tag" :class="{'hl': hl}">
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    hl: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  padding: 4px 10px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  color: $text-color;
  background: #1A1A1A;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.72);
  border-radius: 10px;
  font-size: 12px;
  display: inline-block;
  cursor: default;
  &.hl {
    color: $green;
  }
}
</style>